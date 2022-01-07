import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NodeOptions, TreeNode } from './tree-node';

@Component({
  selector: 'app-tree-diagram',
  templateUrl: './tree-diagram.component.html',
  styleUrls: ['./tree-diagram.component.scss']
})
export class TreeDiagramComponent implements OnInit {
  @Input() treeData:any;
  @Input() options: NodeOptions;
  @Output() treeOutput = new EventEmitter();

  fileToUpload: File = null;
  readyToSave:boolean = false;
  uploading:boolean = false;

  fileExtTypes:string[]=["png","jpg"];
  fileTypes:Array<any> = [
    {type:"image/png"},
    {type:"image/jpeg"}];

  constructor() { }

  ngOnInit() {
    console.log(this.options);
    console.log(this.treeData);

  }

  Action(node:TreeNode, requestedAction:string){
    const model = {
      actionRequired:requestedAction,
      data:node
    }
    this.treeOutput.emit(model);
  }

  ToogleChildren(node:TreeNode, requestedAction:string){
    node.showChildren = !node.showChildren;
    this.Action(node,requestedAction);
  }

  getBackGroundColor(nodeColor:string):string{
    if(!(nodeColor === "" || nodeColor === null) && nodeColor){
      console.log(nodeColor);
      return nodeColor
    }else{
      return "#262626"
    }
  }

  getProfileImg(imgUrl){
    if(imgUrl === null || imgUrl === "" || !imgUrl){
      return "./../../assets/imgs/user1.jpg";
    }
    else{
      return imgUrl;
    }
  }

  handleFileInput(files: FileList, node, requestedAction) {
      if(this.fileTypes.filter(a => a.type === files.item(0).type).length){
        if(files.item(0).size < 27214400){
          this.fileToUpload = files.item(0);
          const model = {
            actionRequired:requestedAction,
            data:{file:this.fileToUpload,employeeData:node}
          }
          this.treeOutput.emit(model);
        }else{
          console.log("Your file is more than 25MB in size, this makes it too big to upload. Please try compressing it first,then try again.");
        }
      }else{
        console.log("Permitted file extensions are png, jpg, mp3, mp4, docx, pdf and xlsx. FileType: '"+files.item(0).type+"', is not compatible with the system.");
      }
  }

  revealForm(model){
    this.treeOutput.emit(model);
  }

}
