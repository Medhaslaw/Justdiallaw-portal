import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { appconfig } from 'src/providers/appconfig';
import { CategoryService } from 'src/services/category.service';
import { PortalService } from 'src/services/portal.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {

  allBlogsObj: any[] = []

  imgUrl: any

  allCategory: any[] = []

  selectedCategorys: any[] = [];
  filterBlogs: any[] = [];
  filterCategory: any;
  searchItem: any;
  constructor(

    private titleService: Title,
    private metaTagService: Meta,
    public portalService: PortalService,
    public appConfig: appconfig,
    public router: Router,
    public _categoryService: CategoryService,
public toaster:ToastrService
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle("Just Law Blogs");
    this.metaTagService.addTags([
      { name: 'keywords', content: 'Just Law,court,Lawyer,Judgements,court issus,Civil Lawyers,Advocates,Solicitors,Attorneys,Lawyers For High Court,Lawyers For Property Case,' },
      { name: 'description', content: 'Lawyers in Hyderabad. Find ✓Civil Lawyers, ✓Advocates, ✓Solicitors, ✓Attorneys, ✓Lawyers For High Court, ✓Lawyers For Property Case, ✓Lawyers .' },
      { name: 'titel', content: 'Just Law Blogs' }
    ])
    this.filterCategory = ''
    
    this.imgUrl = this.appConfig.IMG_Url

    // this.getBlogsList()

    this.getAllCategory()

    this.getAdminAllBlogs()


    window.onscroll = function () { myFunction() };

    let header: any = document.getElementById("myHeader");
    let sticky = header.offsetTop;

    function myFunction() {
      if (window.pageYOffset > sticky) {
        header.classList.add("sticky");
      } else {
        header.classList.remove("sticky");
      }
    }

    window.scrollTo(0, 0);

  }

  // getBlogsList(){
  //   this.portalService.getAllBlogsList().subscribe((res:any) =>{
  //     if(res.success===true){
  //       this.allBlogsObj = res.data
  //     }
  //   })
  // }
  toggle = true;
status = 'Enable'; 
  allBlogs(){
    this.getAllCategory()
    this.getAdminAllBlogs()
    this.filterCategory = ''
    this.toggle = !this.toggle;
    this.status = this.toggle ? 'Enable' : 'Disable';
  }

  

  viewBlog(blogObj: any) {
    let reqData = {
      blog_id: blogObj.id
    }
    this.portalService.viewsCount(reqData).subscribe((res: any) => {
      this.router.navigate(["blog-details/" + blogObj.title.toLowerCase().replaceAll(' ', '-') + '/' + blogObj.id+'/'+ blogObj.created_by.role])
    })
  }

  showmsg:boolean = false
  selectCategorys(val: any) {
    this.filterCategory = val;
    this.allBlogsObj = this.filterBlogs.filter((x: any) => x.category.id == val )

  }

  getAllCategory() {
    this._categoryService.listCategory().subscribe((data: any) => {
      if (data.length > 0) {
        this.allCategory = data.filter((x: any) => x.status);
      }
    })
  }

  search() {
    this.allBlogsObj = this.filterBlogs.filter((x: any) => x.category.category_name.toLowerCase() == this.searchItem.toLowerCase() )
  }

  getAdminAllBlogs() {
    this.portalService.admineAllBlogs().subscribe((res: any) => {
      if (res.success) {
        this.allBlogsObj = res.data;
        this.filterBlogs = res.data;

      }
    })
  }




}
