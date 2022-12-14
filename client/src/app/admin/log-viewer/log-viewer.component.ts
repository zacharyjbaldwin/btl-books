import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Log } from 'src/app/models/log.model';
import { LogService } from 'src/app/services/log.service';

@Component({
  selector: 'log-viewer',
  templateUrl: './log-viewer.component.html',
  styleUrls: ['./log-viewer.component.scss']
})
export class LogViewerComponent implements OnInit, OnDestroy {

  public logs: Log[] = [];
  public loading: boolean = true;
  private subs = new Subscription();
  public searchQuery: string = '';

  constructor(private logService: LogService) { }

  ngOnInit(): void {
    this.fetchLogs();
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  public refresh(): void {
    this.fetchLogs();
  }

  fetchLogs(): void {
    this.loading = true;
    this.subs.add(this.logService.getLogs().subscribe((logs) => {
      if (this.searchQuery != '') {
        let sq = this.searchQuery.toLowerCase().trim();
        this.logs = logs.filter(log => {
          return log.event.toLowerCase().includes(sq)
            || log.message.toLowerCase().includes(sq);
        });
      } else {
        this.logs = logs;
      }
      this.loading = false;
    }));
  }

  public filter(): void {
    this.fetchLogs();
  }
}
