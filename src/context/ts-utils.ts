export const clone = <T>(thing: Readonly<T>): T => JSON.parse(JSON.stringify(thing));

export const panic = (message = "This should not happen") => {
  console.trace(message);
  throw new Error(message);
};

export const defined = <T>(thing: Readonly<T> | undefined, reason: string): T => {
  if (typeof thing === "undefined") {
    return panic(`Value was undefined but should be defined: ${reason}`);
  }

  return thing;
};

export const mapDefined = <T, R>(things: Readonly<T[]>, fn: (item: T) => R | undefined): R[] => {
  const result: R[] = [];

  for (const thing of things) {
    const mappedThing = fn(thing);
    if (typeof mappedThing !== "undefined") {
      result.push(mappedThing);
    }
  }

  return result;
};
