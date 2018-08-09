import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IAccess } from 'app/shared/model/access.model';
import { AccessService } from './access.service';

@Component({
    selector: 'jhi-access-delete-dialog',
    templateUrl: './access-delete-dialog.component.html'
})
export class AccessDeleteDialogComponent {
    access: IAccess;

    constructor(private accessService: AccessService, public activeModal: NgbActiveModal, private eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.accessService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'accessListModification',
                content: 'Deleted an access'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-access-delete-popup',
    template: ''
})
export class AccessDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ access }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(AccessDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.access = access;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}
