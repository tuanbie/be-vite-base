export interface Property {
  name: string;
  type: any;
  ref?: string;
}

interface PropertyOption {
  type: any;
  ref?: string;
}

export const properties = Symbol('properties');

export const Property = (propertyOption: PropertyOption) => {
  return (obj: any, propertyName: string) => {
    const { type, ref } = propertyOption;
    if (typeof type === 'function' && type.prototype[properties]) {
      for (const property of type.prototype[properties]) {
        const propertyList = obj[properties] || (obj[properties] = []);
        propertyList.push({
          name: `${propertyName}.${property.name}`,
          type: property.type,
          ref: property.ref,
        });
      }
    } else {
      const propertyList = obj[properties] || (obj[properties] = []);
      propertyList.push({ name: propertyName, type, ref });
    }
  };
};

export function getProperties(obj: any): Array<Property> {
  return obj.prototype[properties];
}
