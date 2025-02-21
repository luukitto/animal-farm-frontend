import { MatPaginatorIntl } from '@angular/material/paginator';
import { Injectable } from "@angular/core";

@Injectable()
export class GeorgianPaginatorIntl extends MatPaginatorIntl {
  override itemsPerPageLabel = 'ჩანაწერები გვერდზე:';
  override nextPageLabel = 'შემდეგი გვერდი';
  override previousPageLabel = 'წინა გვერდი';
  override firstPageLabel = 'პირველი გვერდი';
  override lastPageLabel = 'ბოლო გვერდი';

  override getRangeLabel = (page: number, pageSize: number, length: number) => {
    if (length === 0) {
      return `0-დან 0-მდე ${length}-დან`;
    }
    const start = page * pageSize + 1;
    const end = Math.min((page + 1) * pageSize, length);
    return `${start}-დან ${end}-მდე ${length}-დან`;
  };
}
