import { Component, Inject, OnInit, Optional } from '@angular/core';
import { BlogService, Iblog } from '../service/blog.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-createpost',
  templateUrl: './createpost.component.html',
  styleUrls: ['./createpost.component.css']
})
export class CreatepostComponent implements OnInit {
  [x: string]: any;
  constructor(private httpblog: BlogService,
    private builder: FormBuilder, private toastr: ToastrService,
    private router: Router,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: Iblog,
    private toast: ToastrService,@Optional() private dialogRef: MatDialogRef<CreatepostComponent>) { }

  actionbtn: string = 'Post Blog'
  receivedData: any;

  postblog = this.builder.group({
    title: this.builder.control('', Validators.compose([Validators.required])),
    description: this.builder.control('', Validators.compose([Validators.required])),
  });
  ngOnInit() {
    // this.receivedData = this.route.snapshot.paramMap.get('data');
    // console.log(this.receivedData)
    console.log(this.data)
    this.updatesetValue()

  }
  proceedBlog() {
    if (!this.data) {
      if (this.postblog.valid) {
        this.httpblog.postBlog(this.postblog.value as Iblog).subscribe((res) => {
          console.log(res)
          this.toast.success('Post Created Successfully');
          this.router.navigate(['/home'])
        })
      } else {
        this.toastr.warning('Please enter valid data Post')
      }
    } else {
      this.updateBlogdata()
    }
    this.postblog.reset()
  }

  updatesetValue() {
    if (this.data) {
      this.actionbtn = 'UpdatePost'
      this.postblog.controls.title.setValue(this.data.title)
      this.postblog.controls.description.setValue(this.data.description)
    }
    // this.postblog.patchValue(this.data)

  }

  updateBlogdata() {
    this.httpblog.updateData(this.data.id as unknown as Iblog, this.postblog.value as Iblog,).subscribe((res) => {
      console.log(res)
      this.toastr.success('Updated successfully')
      this.dialogRef.close(true)
    })
  }
}
