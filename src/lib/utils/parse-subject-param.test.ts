import { describe, it, expect } from "vitest";
import { parseSubjectParam } from "./parse-subject-param";

const ALLOWED_LIST_SUBJECT = ["fisica", "matematica", "storia", "femminismo"];

const cases = [
  {
    param: "fisica",
    allowedList: ALLOWED_LIST_SUBJECT,
    expected: "fisica",
  },
  {
    param: ["fisica", "matematica"],
    allowedList: ALLOWED_LIST_SUBJECT,
    expected: null,
  },
  {
    param: undefined,
    allowedList: ALLOWED_LIST_SUBJECT,
    expected: null,
  },
  {
    param: "Fisica",
    allowedList: ALLOWED_LIST_SUBJECT,
    expected: "fisica",
  },
  {
    param: "arte",
    allowedList: ALLOWED_LIST_SUBJECT,
    expected: null,
  },
  {
    param: "  fisica   ",
    allowedList: ALLOWED_LIST_SUBJECT,
    expected: "fisica",
  },
  {
    param: "fisica",
    allowedList: [],
    expected: null,
  },
];

describe("parseSubjectParam", () => {
  it.each(cases)(
    "returns $expected when param is $param and the allowed list is $allowedList",
    ({ param, allowedList, expected }) => {
      expect(parseSubjectParam(param, allowedList)).toBe(expected);
    },
  );
});
