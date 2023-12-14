import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Editor } from 'ngx-editor';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from 'src/services/category.service';
import { LawyeregService } from 'src/services/lawyereg.service';

@Component({
  selector: 'app-add-blog',
  templateUrl: './add-blog.component.html',
  styleUrls: ['./add-blog.component.scss']
})
export class AddBlogComponent implements OnInit {

  editor!: Editor;
  html: any = '';

  selected = '1';
  files: any;

  addBlogsForm!: FormGroup;
  imgName: any;

  selectedValue: any;
  selectedCar: any;
  isInputDisabled: boolean = false;

  categoryList: any

  fileName: any;
  blogId: any
  categoryName: any;
  id: any;
  isDisabled: any;
  constructor(public fb: FormBuilder,
    public categoryService: CategoryService,
    public lawyerService: LawyeregService,
    public toastr: ToastrService,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.editor = new Editor();
    let url: any = document.URL.split('/')[document.URL.split('/').length - 1];
    this.blogId = document.URL.split('/')[document.URL.split('/').length - 2];
    console.log(this.blogId)
    if (url == 'add-article') {
      console.log(url)
    } else if (this.blogId == 'edit-article') {
      this.articalGet(url)
      this.id = url
      
    }

    console.log(this.id)

    this.allCategoryList()

    this.editor = new Editor();
    this.addBlogsForm = this.fb.group({
      title: ['', [Validators.required],],
      meta_title: ['', [Validators.required]],
      meta_discription: ['', [Validators.required]],
      blog_url: ['', [Validators.required]],
      meta_keyword: ['', [Validators.required]],
      content: ['', [Validators.required]],
      blog_image: [''],
      category: ['', [Validators.required]]
    })
  }
  

  onFileChanged(event: any) {
    this.files = event.target.files[0];
    this.fileName = event.target.files[0].name
  }

  add_blog() {
    if (this.articleData && this.id) {

      let formData = new FormData();
      formData.append('title', this.addBlogsForm.value.title)
      formData.append('meta_title', this.addBlogsForm.value.meta_title)
      formData.append('meta_discription', this.addBlogsForm.value.meta_discription)
      formData.append('blog_url', this.addBlogsForm.value.blog_url)
      formData.append('meta_keyword', this.addBlogsForm.value.meta_keyword)
      formData.append('content', this.addBlogsForm.value.content)
      formData.append('category', this.addBlogsForm.value.category,)
      if( this.files){
        formData.append('blog_image', this.files)
      }
   

      this.lawyerService.articleUpdate(this.id,formData).subscribe((res:any) => {
        if(res){
      
          this.toastr.success('Blog Updated successfully!', 'Success!');
          this.router.navigate(['/lawyer-jdl/view-artical'])
        }
      })


     
    } else if(this.addBlogsForm.valid) {
      let formData = new FormData();
      formData.append('title', this.addBlogsForm.value.title)
      formData.append('meta_title', this.addBlogsForm.value.meta_title)
      formData.append('meta_discription', this.addBlogsForm.value.meta_discription)
      formData.append('blog_url', this.addBlogsForm.value.blog_url)
      formData.append('meta_keyword', this.addBlogsForm.value.meta_keyword)
      formData.append('content', this.addBlogsForm.value.content)
      formData.append('category', this.addBlogsForm.value.category)
      formData.append('blog_image', this.files)
      this.lawyerService.lawyerAddBlogs(formData).subscribe((res: any) => {
        if (res) {
          this.toastr.success('Blog added successfully!', 'Success!');
          this.router.navigate(['/lawyer-jdl/view-artical'])
          
        }

      }, error => {

        if (error.error.blog_image) {
          this.toastr.error('Please Browse the Image', 'Error')
        } else {
          this.toastr.error(error.error.data, 'Error')
        }
      }

      )
     
    }else{
       this.toastr.error('Please Enter All Details', 'Error')
    }

  

  }


  cancelBlog() {
    this.router.navigate(['/lawyer-jdl/view-artical'])
  }

  allCategoryList() {
    this.categoryService.listCategory().subscribe((data: any) => {
      console.log(data)
      let categoryData = data.filter(function (value: any) {
        if (value.status === true) {
          return value
        }
      })
      this.categoryList = categoryData
    })


  }
  articleData: any
  isEnabled:boolean = true;

  articalGet(element: any) {
    this.lawyerService.articleEdit(element).subscribe((res: any) => {
     
      
      this.articleData = res
    
      this.categoryName = this.articleData.category.category_name
      console.log(this.categoryName)
      this.editor = new Editor();
      this.addBlogsForm = this.fb.group({
        title: [this.articleData?.title,  [Validators.required]],
        meta_title: [this.articleData?.meta_title, [Validators.required]],
        meta_discription: [this.articleData?.meta_discription, [Validators.required]],
        blog_url: [this.articleData?.blog_url, [Validators.required]],
        meta_keyword: [this.articleData?.meta_keyword, [Validators.required]],
        content: [this.articleData?.content, ],
        // blog_image: [this.articleData?.blog_image,],
        category: [this.articleData?.category.id]
      })
      
      
      this.fileName = this.articleData?.blog_image_url
      console.log(this.fileName)
      console.log(this.addBlogsForm)
    })

  }


}
