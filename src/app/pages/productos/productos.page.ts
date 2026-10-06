import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { CurrencyPipe, DecimalPipe } from '@angular/common';
import { IonContent, IonSpinner } from '@ionic/angular/standalone';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import { TopbarComponent } from '../../components/topbar/topbar.component';

interface ChartRow {
  id: number;
  title: string;
  value: number;
  pct: number;
}

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [CurrencyPipe, DecimalPipe, IonContent, IonSpinner, TopbarComponent],
  templateUrl: './productos.page.html',
  styleUrls: ['./productos.page.scss'],
})
export class ProductosPage implements OnInit {
  private productService = inject(ProductService);
  @ViewChild(IonContent) content?: IonContent;

  products: Product[] = [];
  isLoading = true;
  errorMessage = '';

  // Paginación
  currentPage = 1;
  pageSize = 12;
  totalProducts = 0;

  // Métricas de la página actual
  rows: ChartRow[] = [];
  maxValue = 1;
  pageValue = 0;
  pageUnits = 0;
  avgDiscount = 0;
  avgRating = 0;

  readonly skeletons = Array.from({ length: 12 });

  get totalPages(): number {
    return Math.ceil(this.totalProducts / this.pageSize) || 1;
  }

  /** Números de página con huecos (null = "…"): 1 … 4 5 6 … 17 */
  get pageItems(): (number | null)[] {
    const total = this.totalPages;
    const c = this.currentPage;
    const wanted = new Set([1, total, c - 1, c, c + 1]);
    const sorted = [...wanted].filter((n) => n >= 1 && n <= total).sort((a, b) => a - b);
    const out: (number | null)[] = [];
    sorted.forEach((n, i) => {
      if (i > 0 && n - sorted[i - 1] > 1) out.push(null);
      out.push(n);
    });
    return out;
  }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.isLoading = true;
    this.errorMessage = '';
    const skip = (this.currentPage - 1) * this.pageSize;

    this.productService.getProducts(this.pageSize, skip).subscribe({
      next: (response) => {
        this.products = response.products;
        this.totalProducts = response.total;
        this.computeMetrics();
        this.isLoading = false;
      },
      error: () => {
        this.errorMessage = 'No se han podido cargar los productos. Comprueba tu conexión e inténtalo de nuevo.';
        this.isLoading = false;
      }
    });
  }

  goTo(page: number): void {
    if (page < 1 || page > this.totalPages || page === this.currentPage) return;
    this.currentPage = page;
    this.loadProducts();
    this.content?.scrollToTop(300);
  }

  nextPage(): void { this.goTo(this.currentPage + 1); }
  prevPage(): void { this.goTo(this.currentPage - 1); }

  calculateDiscountedPrice(product: Product): number {
    return product.price * (1 - (product.discountPercentage || 0) / 100);
  }

  /** unidades × (precio − descuento) */
  calculateStockValue(product: Product): number {
    return product.stock * this.calculateDiscountedPrice(product);
  }

  pct(product: Product): number {
    return Math.max(4, (this.calculateStockValue(product) / this.maxValue) * 100);
  }

  prettyCategory(category: string): string {
    return category.replace(/-/g, ' ');
  }

  private computeMetrics(): void {
    const list = this.products;
    const n = list.length || 1;
    const values = list.map((p) => this.calculateStockValue(p));

    this.maxValue = Math.max(1, ...values);
    this.pageValue = values.reduce((a, b) => a + b, 0);
    this.pageUnits = list.reduce((a, p) => a + p.stock, 0);
    this.avgDiscount = list.reduce((a, p) => a + (p.discountPercentage || 0), 0) / n;
    this.avgRating = list.reduce((a, p) => a + p.rating, 0) / n;

    this.rows = list
      .map((p, i) => ({
        id: p.id,
        title: p.title,
        value: values[i],
        pct: Math.max(4, (values[i] / this.maxValue) * 100),
      }))
      .sort((a, b) => b.value - a.value);
  }
}
