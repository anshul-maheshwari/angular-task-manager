import { PipeTransform, Pipe } from "@angular/core";

@Pipe({
  name: "sortData",
  pure: true
})
export class SortPipe implements PipeTransform {
  transform(val: any[], field: string): any[] {
    return (val || []).sort((a, b) => ("" + a[field]).localeCompare(b[field]));
  }
}
