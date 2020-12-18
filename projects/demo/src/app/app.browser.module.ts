import {
    APP_BASE_HREF,
    CommonModule,
    LocationStrategy,
    PathLocationStrategy,
} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {SpeechSynthesisModule} from '@ng-web-apis/speech';
import {TuiSidebarModule} from '@taiga-ui/addon-mobile';
import {TuiLetModule} from '@taiga-ui/cdk';
import {
    iconsPathFactory,
    TUI_ICONS_PATH,
    TuiButtonModule,
    TuiDataListModule,
    TuiLabelModule,
    TuiRootModule,
    TuiTooltipModule,
} from '@taiga-ui/core';
import {TuiSelectModule, TuiTextAreaModule} from '@taiga-ui/kit';
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app.routes';

@NgModule({
    bootstrap: [AppComponent],
    imports: [
        CommonModule,
        FormsModule,
        SpeechSynthesisModule,
        BrowserAnimationsModule,
        BrowserModule.withServerTransition({appId: 'demo'}),
        AppRoutingModule,
        TuiLetModule,
        TuiSelectModule,
        TuiDataListModule,
        TuiRootModule,
        TuiTextAreaModule,
        TuiButtonModule,
        TuiLabelModule,
        TuiTooltipModule,
        TuiSidebarModule,
    ],
    declarations: [AppComponent],
    providers: [
        {
            provide: LocationStrategy,
            useClass: PathLocationStrategy,
        },
        {
            provide: APP_BASE_HREF,
            useValue: '',
        },
        {
            provide: TUI_ICONS_PATH,
            useValue: iconsPathFactory('assets/taiga-ui/icons/'),
        },
    ],
})
export class AppBrowserModule {}
