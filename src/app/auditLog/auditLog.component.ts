import { Component, OnInit } from '@angular/core';
import { AuditLog } from '../models/audit_log';
import { AuditLogService } from '../services/auditLog.service';

@Component({
  selector: 'app-auditLog',
  templateUrl: './auditLog.component.html',
  styleUrls: ['./auditLog.component.css']
})
export class AuditLogComponent implements OnInit {

  constructor(private serviceAuditLog:AuditLogService) { }
  List:AuditLog[]=[];
  ngOnInit() {
    this.getAuditLogs();
  }
  getAuditLogs(): void {
    this.serviceAuditLog.getAllAuditLogs()
      .subscribe((logs: AuditLog[]) => {
        this.List = logs;
      });
  }
}
