export const removeNonValueProperties = <T extends object>(obj: T): Partial<T> => {
    return Object.entries(obj).reduce((acc, [key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        acc[key as keyof T] = value;
      }
      return acc;
    }, {} as Partial<T>);
  };