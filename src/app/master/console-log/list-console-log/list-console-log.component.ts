import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { serverLocations } from 'src/app/auth/serverLocations';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { ConsoleLogService } from '../console-log.service';

@Component({
  selector: 'app-list-console-log',
  templateUrl: './list-console-log.component.html',
  styleUrls: ['./list-console-log.component.sass']
})
export class ListConsoleLogComponent extends UnsubscribeOnDestroyAdapter implements OnInit {
  getTextList =[];

  constructor(
    private httpService: HttpServiceService,
    private consoleErrorService: ConsoleLogService,
    private serverUrl: serverLocations,
    public router: Router,
    
  ) { 
    super();

  }

  ngOnInit(): void {

    this.httpService.get(this.consoleErrorService.getError).subscribe((res: any) => {

      this.getTextList = res.getTextList;
    },
      (error: HttpErrorResponse) => {
        console.log(error.name + " " + error.message);
      }
    );
  }

}
