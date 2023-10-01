export type SchemaNode =
  | {
      id: string;
      type: "functionalityNode";
      title: string;
      targetFlow?: boolean;
      sourceFlow?: boolean;
      ref?: any;
      controls?: any[];
    }
  | {
      id: string;
      type: "pipeNode";
      items: string[];
    }
  | {
      id: string;
      type: "referenceNode";
      title: string;
    };

export type Cluster = any;
