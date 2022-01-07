export interface TreeNode {
  nodeName: string;
  nodeId:number;
  parentNodeId:number;
  nodeType:string;
  nodeTypeId: number;
  nodeActive: boolean;
  nodePaused:boolean;
  nodeColor:string;
  children:TreeNode[];
  showChildren: boolean;
}

export interface NodeOptions {
  Add:boolean;
  Edit:boolean;
  AttachFile:boolean;
  ToggleNodeActive:boolean;
  ToggleNodePaused:boolean;
  Delete:boolean;
  MoreOptions:boolean;
}
