﻿
<div class="panel panel-widget col-lg-12" ng-controller="KitchenSinkCtrl as vm">

    <div class="progressbar-heading grids-heading">
        <h2>Patient Treatment Plan</h2>
    </div>
    <h2 class="text-center">{{ vm.calendarTitle }}</h2>
    <div class="row">
        <div class="col-md-6 text-center">
            <div class="btn-group">
                <button class="btn btn-primary"
                        mwl-date-modifier
                        date="vm.viewDate"
                        decrement="vm.calendarView">
                    Previous
                </button>
                <button class="btn btn-default"
                        mwl-date-modifier
                        date="vm.viewDate"
                        set-to-today>
                    Today
                </button>
                <button class="btn btn-primary"
                        mwl-date-modifier
                        date="vm.viewDate"
                        increment="vm.calendarView">
                    Next
                </button>
            </div>
        </div>
        <br class="visible-xs visible-sm">
        <div class="col-md-6 text-center">
            <div class="btn-group">
                <label class="btn btn-primary" ng-model="vm.calendarView" uib-btn-radio="'year'">Year</label>
                <label class="btn btn-primary" ng-model="vm.calendarView" uib-btn-radio="'month'">Month</label>
                <label class="btn btn-primary" ng-model="vm.calendarView" uib-btn-radio="'week'">Week</label>
                <label class="btn btn-primary" ng-model="vm.calendarView" uib-btn-radio="'day'">Day</label>
            </div>
        </div>
    </div>
    <br>
    <mwl-calendar events="vm.events"
                  view="vm.calendarView"
                  view-title="vm.calendarTitle"
                  view-date="vm.viewDate"
                  on-event-click="vm.eventClicked(calendarEvent)"
                  on-event-times-changed="vm.eventTimesChanged(calendarEvent); calendarEvent.startsAt = calendarNewEventStart; calendarEvent.endsAt = calendarNewEventEnd"
                  cell-is-open="vm.isCellOpen"
                  day-view-start="08:00"
                  day-view-end="14:59"
                  day-view-split="30"
                  cell-modifier="vm.modifyCell(calendarCell)">
    </mwl-calendar>
    <br><br><br>
    <h3 id="event-editor">
        <label>Treatment Plan Configurations</label>
        <button class="btn btn-primary pull-right"
                ng-click="addIntervention()">
            Add new
        </button>
        <div class="clearfix"></div>
    </h3>
    <table class="table table-bordered">
        <thead>
            <tr><th>No</th>
                <th>Category</th>
                <th>Type</th>
                <!--<th>Secondary color</th>-->
                <th>Starts at</th>
                <th>Ends at</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody class="table table-bordered">
            <tr ng-repeat="event in vm.events track by $index">
                <!--<tr>-->
                <td style="width:2%">{{$index +1}}</td>
                <td>
                    <!--<input type="text"
                           class="form-control"
                           ng-model="event.title">-->

                    <select id="Category"
                            class="form-control"
                            name="categories"
                            ng-model="Category"
                            ng-options="cg as cg.Description for cg in treatmentCategory"
                            ng-change="getTreatmentType(Category,$index)">
                        <option value="" selected="selected">Select category</option>

                    </select>

                </td>
                <td>
                    <select id="treatmentType"
                            class="form-control"
                            name="treatmentType"
                            ng-model="TreatmentType"
                            ng-options="cg as cg.Description for cg in treatmentTypeList"
                          
                            ng-change="submitType(TreatmentType)">

                        <option value="" selected="selected">SelectType</option>

                    </select>



                    <input class="form-control" colorpicker type="hidden" ng-model="event.color.primary" value="#ad2121">
                </td>
                <td ng-show="false">
                    <input class="form-control" colorpicker type="text" ng-model="event.color.secondary" value="#216aad">
                </td>
                <td>
                    <p class="input-group" style="max-width: 200px">
                        <input type="text"
                               class="form-control"
                               readonly
                               uib-datepicker-popup="dd MMMM yyyy"
                               ng-model="event.startsAt"
                               is-open="event.startOpen"
                               close-text="Close">
                        <span class="input-group-btn">
                            <button type="button"
                                    class="btn btn-default"
                                    ng-click="vm.toggle($event, 'startOpen', event)">
                                <i class="glyphicon glyphicon-calendar"></i>
                            </button>
                        </span>
                    </p>
                    <div uib-timepicker
                         ng-model="event.startsAt"
                         hour-step="1"
                         minute-step="15"
                         show-meridian="true">
                    </div>
                </td>
                <td>
                    <p class="input-group" style="max-width: 200px">
                        <input type="text"
                               class="form-control"
                               readonly
                               uib-datepicker-popup="dd MMMM yyyy"
                               ng-model="event.endsAt"
                               is-open="event.endOpen"
                               close-text="Close">
                        <span class="input-group-btn">
                            <button type="button"
                                    class="btn btn-default"
                                    ng-click="vm.toggle($event, 'endOpen', event)">
                                <i class="glyphicon glyphicon-calendar"></i>
                            </button>
                        </span>
                    </p>
                    <div uib-timepicker
                         ng-model="event.endsAt"
                         hour-step="1"
                         minute-step="15"
                         show-meridian="true">
                    </div>
                </td>
                <td>
                    <button class="btn btn-primary"
                             ng-model="TreatmentType"
                            ng-click="updateIntervention($index)">
                        Update
                    </button>
                    <button class="btn btn-danger"
                            ng-click="deleteIntervention($index)">
                            
                        Delete
                    </button>
                </td>
            </tr>
        </tbody>
    </table>
</div>

