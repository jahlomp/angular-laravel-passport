import { InjectionToken } from '@angular/core';
import { LaravelPassportConfig } from './laravel-passport-config';

/**
 * This is an InjectionTToken used to import the config object, provided from the outside
 */
export const LaravelPassportConfigService = new InjectionToken<LaravelPassportConfig>('LaravelPassportConfig');
