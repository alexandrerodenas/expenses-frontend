import {apply_yyyy_MM_dd} from "./date-formatter";

describe("Date formatter", () => {

  test(`Given a date
  when formatting it as yyyy-mm-dd,
  then it returns date as string and formatted as expected.`, () => {
    const aDateToFormat = new Date("2022-11-16T00:09:12.057Z");

    const formattedDate: string = apply_yyyy_MM_dd(aDateToFormat);

    expect(formattedDate).toEqual("2022-11-16");
  });
});
