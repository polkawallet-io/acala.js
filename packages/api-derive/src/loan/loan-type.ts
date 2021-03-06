import { Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

import { ApiInterfaceRx } from '@polkadot/api/types';

import { CurrencyId, Rate, ExchangeRate, Balance, Position, Ratio } from '@acala-network/types/interfaces';

import { memo } from '../utils/memo';
import { DerivedLoanConstants, DerivedLoanType, DerivedLoanOverView, CollateralParams } from '../types/loan';
import { getCollateralCurrencyIds } from '../helps/currency';

/**
 * @name loanConstants
 * @description get constants in loan module
 */
function loanConstants (api: ApiInterfaceRx): DerivedLoanConstants {
  return {
    minimumDebitValue: api.consts.cdpEngine.minimumDebitValue as Balance,
    defaultDebitExchangeRate: api.consts.cdpEngine.defaultDebitExchangeRate as ExchangeRate,
    defaultLiquidationRatio: api.consts.cdpEngine.defaultLiquidationRatio as Ratio,
    defaultLiquidationPenalty: api.consts.cdpEngine.defaultLiquidationPenalty as Rate,
    expectedBlockTime: api.consts.babe.expectedBlockTime
  };
}

/**
 * @name loanType
 * @description get loan type
 * @param {(CurrencyId | string)} currency
 */
export function loanType (api: ApiInterfaceRx): (currncy: CurrencyId | string) => Observable<DerivedLoanType> {
  return memo((currency: CurrencyId | string) => {
    return combineLatest([
      api.query.cdpEngine.globalStabilityFee<Rate>(),
      api.query.cdpEngine.debitExchangeRate<Rate>(currency),
      api.query.cdpEngine.collateralParams<CollateralParams>(currency)
    ]).pipe(
      map((result) => {
        const constants = loanConstants(api);
        const [globalStabilityFee, debitExchangeRate, collateralParams] = result;

        return {
          currency,
          debitExchangeRate: debitExchangeRate.isEmpty ? constants.defaultDebitExchangeRate : debitExchangeRate,
          liquidationPenalty: collateralParams.liquidationPenalty.isEmpty ? constants.defaultLiquidationPenalty : collateralParams.liquidationPenalty,
          liquidationRatio: collateralParams.liquidationRatio.isEmpty ? constants.defaultLiquidationRatio : collateralParams.liquidationRatio,
          requiredCollateralRatio: collateralParams.requiredCollateralRatio,
          stabilityFee: collateralParams.stabilityFee,
          globalStabilityFee: globalStabilityFee,
          maximumTotalDebitValue: collateralParams.maximumTotalDebitValue,
          minimumDebitValue: constants.minimumDebitValue,
          expectedBlockTime: constants.expectedBlockTime
        };
      })
    );
  });
}

/**
 * @name allLoanTypes
 * @description  get loan types of all kinds of collateral
 */
export function allLoanTypes (api: ApiInterfaceRx): () => Observable<DerivedLoanType[]> {
  return memo(() => {
    const collateralCurrencyIds = getCollateralCurrencyIds(api);
    const loanTypeQuery = loanType(api);

    return combineLatest(collateralCurrencyIds.map((currencyId) => loanTypeQuery(currencyId)));
  });
}

/**
 * @name loanOverview
 * @description get loan overview includes total debit, total collateral
 * @param {(CurrencyId | string)} currency
 */
export function loanOverview (api: ApiInterfaceRx): (currency: CurrencyId | string) => Observable<DerivedLoanOverView> {
  return memo((currency: CurrencyId | string) => api.query.loans.totalPositions<Position>(currency).pipe(
    map((result) => {
      const { collateral, debit } = result;

      return { currency, totalDebit: debit, totalCollateral: collateral };
    })
  ));
}

/**
 * @name allLoanOverview
 * @description get loan overviews of all kinds of collatearl
 */
export function allLoanOverviews (api: ApiInterfaceRx): () => Observable<DerivedLoanOverView[]> {
  return memo(() => {
    const collateralCurrencyIds = getCollateralCurrencyIds(api);
    const loanOverViewQuery = loanOverview(api);

    return combineLatest(collateralCurrencyIds.map((currencyId) => loanOverViewQuery(currencyId)));
  });
}
