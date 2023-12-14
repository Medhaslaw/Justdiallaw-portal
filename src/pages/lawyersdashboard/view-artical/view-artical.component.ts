import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Route, Router } from '@angular/router';
import { Editor } from 'ngx-editor';
import { LawyeregService } from 'src/services/lawyereg.service';


export interface appoinmentData {
  status: string;
  titel: string;
  created_date:string;
  category_name:string,
}


@Component({
  selector: 'app-view-artical',
  templateUrl: './view-artical.component.html',
  styleUrls: ['./view-artical.component.scss']
})
export class ViewArticalComponent implements OnInit {

  
  imgUrl:any
  articalList:any[] = []

  displayedColumns: string[] = [  'titel','created_date', 'category_name' ,'status','action',];
  dataSource = new MatTableDataSource<appoinmentData>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  appoinmentList:any[]=[];
  files: any;
  fileName: any;
  editor!: Editor;
  html:any= '';
  categoryList:any
  articleData: any;
  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  addBlogsForm!:FormGroup;

  constructor(public lawyerService: LawyeregService, public fb: FormBuilder, public router: Router) { }

  ngOnInit(): void {
    this.editor = new Editor();
    this.getArtical()

    this.addBlogsForm = this.fb.group({
      title: ['', [Validators.required]],
      meta_title:['', [Validators.required]],
      meta_discription:['', [Validators.required]],
      blog_url:['', [Validators.required]],
      meta_keyword:['', [Validators.required]],
      content:['', [Validators.required]],
      blog_image:['' ],
      category:['', [Validators.required]]
    })

    this.articleGet('')
    
  }


  onFileChanged(event: any){
    this.files = event.target.files[0];
   this.fileName = event.target.files[0].name
  }

getArtical(){
  this.lawyerService.lawyerAllArtical().subscribe((res:any) =>{
    if(res){
      this.articalList = res
      this.dataSource = new MatTableDataSource(this.articalList);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

      // console.log( this.articalList)

    }
  })
}
show:boolean = true

articleGet(element:any){
  console.log(element)
  this.lawyerService.articleEdit(element).subscribe(res => {
    console.log(res)

  })
}

editArticle(element:any){
  // console.log(element)


  this.router.navigate(['/lawyer-jdl/view-artical/edit-article/'+ element ])
// let rq ={
//   blogContent: this.addBlogsForm.value.content,
// }

// this.lawyerService.articleEdit(element).subscribe((res:any) => {
//   console.log(res)
//   this.articleData = res
//   this.editor = new Editor();

//   this.addBlogsForm = this.fb.group({
    
//     title: [this.articleData?.title, [Validators.required]],
//     meta_title:[this.articleData?.meta_title, [Validators.required]],
//     meta_discription:[this.articleData?.meta_discription, [Validators.required]],
//     blog_url:[this.articleData?.blog_url, [Validators.required]],
//     meta_keyword:[this.articleData?.meta_keyword, [Validators.required]],
//     content:[this.articleData?.content, [Validators.required]],
//     blog_image:[this.articleData?.blog_image,],
//     category:[this.articleData?.category, [Validators.required]]
//   })
//   this.fileName = this.articleData?.blog_image
//    this.show = false
  
// })

}
add_blog(){

}
cancelBlog(){

}


  accept_artical(element:any){

  }

  editBlog(blogDt:any){

  }

  delet_artcal(ele:any){

  }

  // set_top_artical(val:any){

  // }

  // remove_top_artical(eve:any){

  // }

}

