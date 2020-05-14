import { PipeTransform, Pipe } from "@angular/core";

@Pipe({
  name: "shorter"
})
export class ShorterPipe implements PipeTransform {
  transform(val: string, size = 10, reverse = false): string {
    const value = val || "";
    let result = value;
    if (reverse) {
      result = result
        .split("")
        .reverse()
        .join("");
    }

    if (value.length > size) {
      return result.substr(0, size);
    }

    return result;
  }
}
