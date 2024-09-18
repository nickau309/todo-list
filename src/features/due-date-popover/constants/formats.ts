import getArraysCombination from "../utils/get-arrays-combination";

const DAY = ["D", "DD"];
const NUM_MONTH = ["M", "MM"];
const STR_MONTH = ["MMM", "MMMM"];
const YEAR = ["YYYY"];

const NUM_DELIMITERS_WITHOUT_YEAR = ["-", "/"];
const NUM_DELIMITERS_WITH_YEAR = ["", "-", "/"];
const STR_DELIMITERS = [""];

const NUM_DM = getArraysCombination(
  DAY,
  NUM_DELIMITERS_WITHOUT_YEAR,
  NUM_MONTH,
);
const STR_DM = getArraysCombination(DAY, STR_DELIMITERS, STR_MONTH);
const STR_M = "MMMM";
const STR_MD = getArraysCombination(STR_MONTH, STR_DELIMITERS, DAY);

const NUM_DMY = getArraysCombination(
  DAY,
  NUM_DELIMITERS_WITH_YEAR,
  NUM_MONTH,
  NUM_DELIMITERS_WITH_YEAR,
  YEAR,
);
const STR_DMY = getArraysCombination(
  DAY,
  STR_DELIMITERS,
  STR_MONTH,
  STR_DELIMITERS,
  YEAR,
);
const STR_MDY = getArraysCombination(
  STR_MONTH,
  STR_DELIMITERS,
  DAY,
  STR_DELIMITERS,
  YEAR,
);
const STR_MY = getArraysCombination(STR_MONTH, STR_DELIMITERS, YEAR);
const STR_YDM = getArraysCombination(
  YEAR,
  STR_DELIMITERS,
  DAY,
  STR_DELIMITERS,
  STR_MONTH,
);
const STR_YM = getArraysCombination(YEAR, STR_DELIMITERS, STR_MONTH);
const NUM_YMD = getArraysCombination(
  YEAR,
  NUM_DELIMITERS_WITH_YEAR,
  NUM_MONTH,
  NUM_DELIMITERS_WITH_YEAR,
  DAY,
);
const STR_YMD = getArraysCombination(
  YEAR,
  STR_DELIMITERS,
  STR_MONTH,
  STR_DELIMITERS,
  DAY,
);

export const FORMATS_WITHOUT_YEAR = NUM_DM.concat(STR_DM, STR_M, STR_MD);
export const FORMATS_WITH_YEAR = NUM_DMY.concat(
  STR_DMY,
  STR_MDY,
  STR_MY,
  STR_YDM,
  STR_YM,
  NUM_YMD,
  STR_YMD,
);
