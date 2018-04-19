import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { JsonbinHttpService } from '../services/data/jsonbin-http.service';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { GetRubric, GetRubrics, RubricsActionTypes } from './rubrics.actions';
import { Action } from '@ngrx/store';
import { LocalStorageService } from '../services/data/local-storage.service';

@Injectable()
export class RubricsEffects {
    @Effect()
    public getRubric: Observable<Action> = this.actions
        .ofType<GetRubric>(RubricsActionTypes.GetRubric)
        .mergeMap(action => {
            return this.jsonbin.getRubric(action.payload)
                .map(data => ({type: RubricsActionTypes.GetRubricSuccess, payload: data}))
                .catch(err => of({type: RubricsActionTypes.GetRubricError, payload: err}));
        });

    @Effect()
    public getRubrics: Observable<Action> = this.actions
        .ofType<GetRubrics>(RubricsActionTypes.GetRubrics)
        .mergeMap(action => {
            return this.localStorage.getRubrics()
                .map(data => ({type: RubricsActionTypes.GetRubricsSuccess, payload: data}))
                .catch(err => of({type: RubricsActionTypes.GetRubricsError, payload: err}));
        });

    constructor(
        private jsonbin: JsonbinHttpService,
        private localStorage: LocalStorageService,
        private actions: Actions
    ) {}
}
