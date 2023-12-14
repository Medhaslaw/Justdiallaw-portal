import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { appconfig } from 'src/providers/appconfig';
import { CategoryService } from 'src/services/category.service';
import { allCategoryInterFace } from '../components/lawyer-info/models/category';
import * as AOS from 'aos';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  categoryList: any;
  imgUrl:any;
  constructor(public categoryService: CategoryService, public _appConfig: appconfig, public router: Router) { }

  ngOnInit(): void {
    this.imgUrl = this._appConfig.IMG_Url;
    this.getcategoryList()

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

  categoryWise(category: any) {
    this.router.navigate(['/lawyers-list'],
      { queryParams: { category: category.id, city: '', language: '' } })
  }

  ngAfterViewInit() {
    AOS.init({
      once: true
    });
  }


  getcategoryList(): any {
    this.categoryService.listCategory().subscribe((data: allCategoryInterFace[]) => {
      if (data.length > 0) {
        let categoryData = data.filter((val: any) => {
          return val.status === true
        })
        this.categoryList = categoryData;
      } else {
        this.categoryList = []
      }

    }, err => {
      this.categoryList = []
    })
  }

}
