let editorInstance:any
let typeFile:any = ['jpg','jpeg','gif','png','bmp','tiff']

function imageEditorHandler() {  
    let base64result:any
    let data:any  = this.editorInstance
    if (this.editorInstance != null) {  
        const range = this.editorInstance.getSelection();  
        if (range != null) {  
            let input = document.createElement('input');  
            input.setAttribute('type', 'file');  
            input.setAttribute('accept', 'image/*');
            input.addEventListener('change', () => {  
                if (input.files != null) {  
                    let file = input.files[0];  
                    if (file != null) {  
                        let reader = new FileReader();  
                        let dataFile = new FormData()
                        dataFile.append('image',file)
                        reader.readAsDataURL(file);  
                        reader.onerror = function(error) {  
                            // console.log('Error: ', error);  
                        };  
                        reader.onloadend = function() {  
                            //Read complete  
                            if (reader.readyState == 2) {  
                                base64result = reader.result;  
                               }  
                        };
                           
                        this.typeFile.filter((type)=>{
                            if(file.name.split('.')[1].toLowerCase() === type ){
                               this.upload(dataFile).subscribe((e)=>{
                                  data.insertEmbed(range.index, 'image', this._data.basePort+"gambar/"+e);
                                })
                            }
                        })
                    }  
                }  
            });  
            input.click();
        }  
        
    }  
  }  

function upload(file){
     return this.post("upload/",file)
      .catch((err)=>{
        return Observable.throw(err)
      })
}


function editor(quill:any) {
    quill.focus()
    this.editorInstance = quill;
    let toolbar = quill.getModule('toolbar');  
    toolbar.addHandler('image', this.imageEditorHandler.bind(this)); 
  }