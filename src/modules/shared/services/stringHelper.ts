class StringHelper {
  getValueToInterpolateInStringArray = (stringArray: string[]) => {
    let allValues = new Set<string>();
    stringArray.forEach((stringItem) => {
      allValues = new Set<string>([
        ...allValues,
        ...this.getValueToInterpolateInString(stringItem),
      ]);
    });
    return allValues;
  };

  getValueToInterpolateInString = (stringItem: string) => {
    const allValues = new Set<string>();
    const results = stringItem.matchAll(/\{(.*?)\}/gi);
    for (const resultItem of results) {
      allValues.add(resultItem[1]);
    }
    return allValues;
  };
}

export const stringHelper = new StringHelper();
