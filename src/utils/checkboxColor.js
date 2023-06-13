const animations = {
  1: {
    check: "animate-p1-checkbox-check",
    uncheck: "animate-p1-checkbox-uncheck",
  },
  2: {
    check: "animate-p2-checkbox-check",
    uncheck: "animate-p2-checkbox-uncheck",
  },
  3: {
    check: "animate-p3-checkbox-check",
    uncheck: "animate-p3-checkbox-uncheck",
  },
  4: {
    check: "animate-p4-checkbox-check",
    uncheck: "animate-p4-checkbox-uncheck",
  },
};

const bgColor = {
  1: {
    check: "bg-checkbox-p1",
    uncheck: "bg-checkbox-p1/10",
  },
  2: {
    check: "bg-checkbox-p2",
    uncheck: "bg-checkbox-p2/10",
  },
  3: {
    check: "bg-checkbox-p3",
    uncheck: "bg-checkbox-p3/10",
  },
  4: {
    check: "bg-checkbox-p4",
    uncheck: "bg-transparent",
  },
};

const checkedBgColor = {
  1: "checked:bg-checkbox-p1",
  2: "checked:bg-checkbox-p2",
  3: "checked:bg-checkbox-p3",
  4: "checked:bg-checkbox-p4",
};

const disabledBgColor = {
  1: {
    check: "bg-checkbox-p1-disabled",
    uncheck: "bg-checkbox-p1-disabled/10",
  },
  2: {
    check: "bg-checkbox-p2-disabled",
    uncheck: "bg-checkbox-p2-disabled/10",
  },
  3: {
    check: "bg-checkbox-p3-disabled",
    uncheck: "bg-checkbox-p3-disabled/10",
  },
  4: {
    check: "bg-checkbox-p4-disabled",
    uncheck: "bg-transparent",
  },
};

const disabledTextColor = {
  1: "text-checkbox-p1-disabled",
  2: "text-checkbox-p2-disabled",
  3: "text-checkbox-p3-disabled",
  4: "text-checkbox-p4-disabled",
};

const textColor = {
  1: "text-checkbox-p1",
  2: "text-checkbox-p2",
  3: "text-checkbox-p3",
  4: "text-checkbox-p4",
};

export {
  animations,
  bgColor,
  checkedBgColor,
  disabledBgColor,
  disabledTextColor,
  textColor,
};
