import { Injectable, NgZone, OnDestroy } from '@angular/core';
import {
  AuthRedirectService,
  BaseSiteService,
  ExternalJsFileLoader,
  GlobalMessageService,
  GlobalMessageType,
  LanguageService,
  User,
  UserService,
  WindowRef,
} from '@spartacus/core';
import { combineLatest, ReplaySubject, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { GigyaAuthService } from '../../auth/facade/gigya-auth.service';
import { GigyaConfig } from '../../config/gigya-config';

@Injectable({
  providedIn: 'root',
})
export class GigyaJsService implements OnDestroy {
  private loaded$ = new ReplaySubject<boolean>(1);
  private errorLoading$ = new ReplaySubject<boolean>(1);
  subscription: Subscription = new Subscription();

  constructor(
    private gigyaConfig: GigyaConfig,
    private baseSiteService: BaseSiteService,
    private languageService: LanguageService,
    private externalJsFileLoader: ExternalJsFileLoader,
    private winRef: WindowRef,
    private auth: GigyaAuthService,
    private globalMessageService: GlobalMessageService,
    private authRedirectService: AuthRedirectService,
    private zone: NgZone,
    private userService: UserService
  ) {}

  /**
   * Initialize Gigya script
   */
  initialize(): void {
    this.loadGigyaJavascript();
  }

  /**
   * Returns observable with the information if gigya script is loaded.
   */
  didLoad() {
    return this.loaded$.asObservable();
  }

  /**
   * Returns observable with the information if gigya script failed to load.
   */
  didScriptFailToLoad() {
    return this.errorLoading$.asObservable();
  }

  /**
   * Method which loads the CDC Script
   */
  loadGigyaJavascript(): void {
    this.subscription.add(
      combineLatest([
        this.baseSiteService.getActive(),
        this.languageService.getActive(),
      ])
        .pipe(take(1))
        .subscribe(([baseSite, language]) => {
          const scriptForBaseSite = this.getJavascriptUrlForCurrentSite(
            baseSite
          );
          if (scriptForBaseSite) {
            const javascriptUrl = `${scriptForBaseSite}&lang=${language}`;
            this.externalJsFileLoader.load(
              javascriptUrl,
              undefined,
              () => {
                this.registerEventListeners(baseSite);
                this.loaded$.next(true);
              },
              () => {
                this.errorLoading$.next(true);
              }
            );
            this.winRef.nativeWindow['__gigyaConf'] = { include: 'id_token' };
          }
        })
    );
  }

  private getJavascriptUrlForCurrentSite(baseSite: string): string {
    const filteredConfigs: any = this.gigyaConfig.gigya.filter(
      (conf) => conf.baseSite === baseSite
    );
    if (filteredConfigs && filteredConfigs.length > 0) {
      return filteredConfigs[0].javascriptUrl;
    }
    return '';
  }

  /**
   * Register login event listeners for CDC login
   *
   * @param baseSite
   */
  registerEventListeners(baseSite: string): void {
    this.subscription.add(
      this.auth.getUserToken().subscribe((data) => {
        if (data && data.access_token) {
          this.globalMessageService.remove(GlobalMessageType.MSG_TYPE_ERROR);
          this.authRedirectService.redirect();
        }
      })
    );
    this.addGigyaEventHandlers(baseSite);
  }

  /**
   * Method to register gigya's event handlers
   *
   * @param baseSite
   */
  addGigyaEventHandlers(baseSite: string): void {
    this.winRef.nativeWindow?.['gigya']?.accounts?.addEventHandlers({
      onLogin: (...params) => {
        this.zone.run(() => this.onLoginEventHandler(baseSite, ...params));
      },
    });
  }

  /**
   * Trigger login to Commerce once an onLogin event is triggered by CDC Screen Set.
   *
   * @param baseSite
   * @param response
   */
  onLoginEventHandler(baseSite: string, response?: any) {
    if (response) {
      this.auth.authorizeWithCustomGigyaFlow(
        response.UID,
        response.UIDSignature,
        response.signatureTimestamp,
        response.id_token !== undefined ? response.id_token : '',
        baseSite
      );
    }
  }

  /**
   * Updates user details using the existing User API
   *
   * @param response
   */
  onProfileUpdateEventHandler(response?: any) {
    if (response) {
      const userDetails: User = {};
      userDetails.firstName = response.profile.firstName;
      userDetails.lastName = response.profile.lastName;
      this.userService.updatePersonalDetails(userDetails);
    }
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
