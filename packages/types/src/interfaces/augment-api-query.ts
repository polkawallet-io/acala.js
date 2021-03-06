// Auto-generated via `yarn polkadot-types-from-chain`, do not edit
/* eslint-disable */

import { AnyNumber, ITuple, Observable } from '@polkadot/types/types';
import { Option, Vec } from '@polkadot/types/codec';
import { bool, u32 } from '@polkadot/types/primitive';
import { CollateralAuctionItem, DebitAuctionItem, SurplusAuctionItem } from '@acala-network/types/interfaces/auctionManager';
import { RiskManagementParams } from '@acala-network/types/interfaces/cdpEngine';
import { Position } from '@acala-network/types/interfaces/loans';
import { BondingLedger } from '@acala-network/types/interfaces/nomineesElection';
import { AirDropCurrencyId, CurrencyId } from '@acala-network/types/interfaces/primitives';
import { AccountId, AuctionId, Balance, BlockNumber, OracleKey, Share } from '@acala-network/types/interfaces/runtime';
import { PolkadotAccountId } from '@acala-network/types/interfaces/stakingPool';
import { ExchangeRate, Rate } from '@acala-network/types/interfaces/support';
import { OrderedSet, TimestampedValueOf } from '@open-web3/orml-types/interfaces/oracle';
import { AuctionInfo, Price } from '@open-web3/orml-types/interfaces/traits';
import { AccountData, BalanceLock } from '@polkadot/types/interfaces/balances';
import { AuthorityId } from '@polkadot/types/interfaces/consensus';
import { EraIndex, MomentOf } from '@polkadot/types/interfaces/staking';
import { ApiTypes } from '@polkadot/api/types';

declare module '@polkadot/api/types/storage' {
  export interface AugmentedQueries<ApiType> {
    accounts: {
      [index: string]: QueryableStorageEntry<ApiType>;
      /**
       * Mapping from account id to flag for free transfer.
       **/
      freeTransferEnabledAccounts: AugmentedQuery<ApiType, (arg: AccountId | string | Uint8Array) => Observable<Option<ITuple<[]>>>> & QueryableStorageEntry<ApiType>;
      /**
       * Mapping from account id to free transfer records, record moment when a transfer tx occurs.
       **/
      lastFreeTransfers: AugmentedQuery<ApiType, (arg: AccountId | string | Uint8Array) => Observable<Vec<MomentOf>>> & QueryableStorageEntry<ApiType>;
    };
    airDrop: {
      [index: string]: QueryableStorageEntry<ApiType>;
      airDrops: AugmentedQueryDoubleMap<ApiType, (key1: AccountId | string | Uint8Array, key2: AirDropCurrencyId | 'KAR'|'ACA' | number | Uint8Array) => Observable<Balance>> & QueryableStorageEntry<ApiType>;
    };
    auction: {
      [index: string]: QueryableStorageEntry<ApiType>;
      /**
       * Index auctions by end time.
       **/
      auctionEndTime: AugmentedQueryDoubleMap<ApiType, (key1: BlockNumber | AnyNumber | Uint8Array, key2: AuctionId | AnyNumber | Uint8Array) => Observable<Option<ITuple<[]>>>> & QueryableStorageEntry<ApiType>;
      /**
       * Stores on-going and future auctions. Closed auction are removed.
       **/
      auctions: AugmentedQuery<ApiType, (arg: AuctionId | AnyNumber | Uint8Array) => Observable<Option<AuctionInfo>>> & QueryableStorageEntry<ApiType>;
      /**
       * Track the next auction ID.
       **/
      auctionsIndex: AugmentedQuery<ApiType, () => Observable<AuctionId>> & QueryableStorageEntry<ApiType>;
    };
    auctionManager: {
      [index: string]: QueryableStorageEntry<ApiType>;
      /**
       * Mapping from auction id to collateral auction info
       **/
      collateralAuctions: AugmentedQuery<ApiType, (arg: AuctionId | AnyNumber | Uint8Array) => Observable<Option<CollateralAuctionItem>>> & QueryableStorageEntry<ApiType>;
      /**
       * Mapping from auction id to debit auction info
       **/
      debitAuctions: AugmentedQuery<ApiType, (arg: AuctionId | AnyNumber | Uint8Array) => Observable<Option<DebitAuctionItem>>> & QueryableStorageEntry<ApiType>;
      /**
       * Mapping from auction id to surplus auction info
       **/
      surplusAuctions: AugmentedQuery<ApiType, (arg: AuctionId | AnyNumber | Uint8Array) => Observable<Option<SurplusAuctionItem>>> & QueryableStorageEntry<ApiType>;
      /**
       * Record of the total collateral amount of all active collateral auctions under specific collateral type
       * CollateralType -> TotalAmount
       **/
      totalCollateralInAuction: AugmentedQuery<ApiType, (arg: CurrencyId | 'ACA'|'AUSD'|'DOT'|'XBTC'|'LDOT'|'RENBTC' | number | Uint8Array) => Observable<Balance>> & QueryableStorageEntry<ApiType>;
      /**
       * Record of total fix amount of all active debit auctions
       **/
      totalDebitInAuction: AugmentedQuery<ApiType, () => Observable<Balance>> & QueryableStorageEntry<ApiType>;
      /**
       * Record of total surplus amount of all active surplus auctions
       **/
      totalSurplusInAuction: AugmentedQuery<ApiType, () => Observable<Balance>> & QueryableStorageEntry<ApiType>;
      /**
       * Record of total target sales of all active collateral auctions
       **/
      totalTargetInAuction: AugmentedQuery<ApiType, () => Observable<Balance>> & QueryableStorageEntry<ApiType>;
    };
    cdpEngine: {
      [index: string]: QueryableStorageEntry<ApiType>;
      /**
       * Mapping from collateral type to its risk management params
       **/
      collateralParams: AugmentedQuery<ApiType, (arg: CurrencyId | 'ACA'|'AUSD'|'DOT'|'XBTC'|'LDOT'|'RENBTC' | number | Uint8Array) => Observable<RiskManagementParams>> & QueryableStorageEntry<ApiType>;
      /**
       * Mapping from collateral type to its exchange rate of debit units and debit value
       **/
      debitExchangeRate: AugmentedQuery<ApiType, (arg: CurrencyId | 'ACA'|'AUSD'|'DOT'|'XBTC'|'LDOT'|'RENBTC' | number | Uint8Array) => Observable<Option<ExchangeRate>>> & QueryableStorageEntry<ApiType>;
      /**
       * Global stability fee rate for all types of collateral
       **/
      globalStabilityFee: AugmentedQuery<ApiType, () => Observable<Rate>> & QueryableStorageEntry<ApiType>;
    };
    cdpTreasury: {
      [index: string]: QueryableStorageEntry<ApiType>;
      /**
       * The maximum amount of collateral amount for sale per collateral auction
       **/
      collateralAuctionMaximumSize: AugmentedQuery<ApiType, (arg: CurrencyId | 'ACA'|'AUSD'|'DOT'|'XBTC'|'LDOT'|'RENBTC' | number | Uint8Array) => Observable<Balance>> & QueryableStorageEntry<ApiType>;
      /**
       * Current total debit value of system. It's not same as debit in CDP engine,
       * it is the bad debt of the system.
       **/
      debitPool: AugmentedQuery<ApiType, () => Observable<Balance>> & QueryableStorageEntry<ApiType>;
    };
    dex: {
      [index: string]: QueryableStorageEntry<ApiType>;
      /**
       * Incentive reward rate for different currency type
       * CurrencyType -> IncentiveRate
       **/
      liquidityIncentiveRate: AugmentedQuery<ApiType, (arg: CurrencyId | 'ACA'|'AUSD'|'DOT'|'XBTC'|'LDOT'|'RENBTC' | number | Uint8Array) => Observable<Rate>> & QueryableStorageEntry<ApiType>;
      /**
       * Liquidity pool, which is the trading pair for specific currency type to base currency type.
       * CurrencyType -> (OtherCurrencyAmount, BaseCurrencyAmount)
       **/
      liquidityPool: AugmentedQuery<ApiType, (arg: CurrencyId | 'ACA'|'AUSD'|'DOT'|'XBTC'|'LDOT'|'RENBTC' | number | Uint8Array) => Observable<ITuple<[Balance, Balance]>>> & QueryableStorageEntry<ApiType>;
      /**
       * Shares records indexed by currency type and account id
       * CurrencyType -> Owner -> ShareAmount
       **/
      shares: AugmentedQueryDoubleMap<ApiType, (key1: CurrencyId | 'ACA'|'AUSD'|'DOT'|'XBTC'|'LDOT'|'RENBTC' | number | Uint8Array, key2: AccountId | string | Uint8Array) => Observable<Share>> & QueryableStorageEntry<ApiType>;
      /**
       * Total interest(include total withdrawn) and total withdrawn interest for different currency type
       * CurrencyType -> (TotalInterest, TotalWithdrawnInterest)
       **/
      totalInterest: AugmentedQuery<ApiType, (arg: CurrencyId | 'ACA'|'AUSD'|'DOT'|'XBTC'|'LDOT'|'RENBTC' | number | Uint8Array) => Observable<ITuple<[Balance, Balance]>>> & QueryableStorageEntry<ApiType>;
      /**
       * Total shares amount of liquidity pool specified by currency type
       * CurrencyType -> TotalSharesAmount
       **/
      totalShares: AugmentedQuery<ApiType, (arg: CurrencyId | 'ACA'|'AUSD'|'DOT'|'XBTC'|'LDOT'|'RENBTC' | number | Uint8Array) => Observable<Share>> & QueryableStorageEntry<ApiType>;
      /**
       * Withdrawn interest indexed by currency type and account id
       * CurrencyType -> Owner -> WithdrawnInterest
       **/
      withdrawnInterest: AugmentedQueryDoubleMap<ApiType, (key1: CurrencyId | 'ACA'|'AUSD'|'DOT'|'XBTC'|'LDOT'|'RENBTC' | number | Uint8Array, key2: AccountId | string | Uint8Array) => Observable<Balance>> & QueryableStorageEntry<ApiType>;
    };
    emergencyShutdown: {
      [index: string]: QueryableStorageEntry<ApiType>;
      /**
       * Open final redemption flag
       **/
      canRefund: AugmentedQuery<ApiType, () => Observable<bool>> & QueryableStorageEntry<ApiType>;
      /**
       * Emergency shutdown flag
       **/
      isShutdown: AugmentedQuery<ApiType, () => Observable<bool>> & QueryableStorageEntry<ApiType>;
    };
    honzon: {
      [index: string]: QueryableStorageEntry<ApiType>;
      /**
       * The authorization relationship map from
       * Authorizer -> (CollateralType, Authorizee) -> Authorized
       **/
      authorization: AugmentedQueryDoubleMap<ApiType, (key1: AccountId | string | Uint8Array, key2: ITuple<[CurrencyId, AccountId]> | [CurrencyId | 'ACA' | 'AUSD' | 'DOT' | 'XBTC' | 'LDOT' | 'RENBTC' | number | Uint8Array, AccountId | string | Uint8Array]) => Observable<bool>> & QueryableStorageEntry<ApiType>;
    };
    loans: {
      [index: string]: QueryableStorageEntry<ApiType>;
      /**
       * The collateralized debit positions, map from
       * Owner -> CollateralType -> Position
       **/
      positions: AugmentedQueryDoubleMap<ApiType, (key1: CurrencyId | 'ACA'|'AUSD'|'DOT'|'XBTC'|'LDOT'|'RENBTC' | number | Uint8Array, key2: AccountId | string | Uint8Array) => Observable<Position>> & QueryableStorageEntry<ApiType>;
      /**
       * The total collateralized debit positions, map from
       * CollateralType -> Position
       **/
      totalPositions: AugmentedQuery<ApiType, (arg: CurrencyId | 'ACA'|'AUSD'|'DOT'|'XBTC'|'LDOT'|'RENBTC' | number | Uint8Array) => Observable<Position>> & QueryableStorageEntry<ApiType>;
    };
    nomineesElection: {
      [index: string]: QueryableStorageEntry<ApiType>;
      currentEra: AugmentedQuery<ApiType, () => Observable<EraIndex>> & QueryableStorageEntry<ApiType>;
      ledger: AugmentedQuery<ApiType, (arg: AccountId | string | Uint8Array) => Observable<BondingLedger>> & QueryableStorageEntry<ApiType>;
      nominations: AugmentedQuery<ApiType, (arg: AccountId | string | Uint8Array) => Observable<Vec<PolkadotAccountId>>> & QueryableStorageEntry<ApiType>;
      nominees: AugmentedQuery<ApiType, () => Observable<Vec<PolkadotAccountId>>> & QueryableStorageEntry<ApiType>;
      votes: AugmentedQuery<ApiType, (arg: PolkadotAccountId | string | Uint8Array) => Observable<Balance>> & QueryableStorageEntry<ApiType>;
    };
    oracle: {
      [index: string]: QueryableStorageEntry<ApiType>;
      /**
       * If an oracle operator has feed a value in this block
       **/
      hasDispatched: AugmentedQuery<ApiType, () => Observable<OrderedSet>> & QueryableStorageEntry<ApiType>;
      /**
       * True if Self::values(key) is up to date, otherwise the value is stale
       **/
      isUpdated: AugmentedQuery<ApiType, (arg: OracleKey | 'ACA'|'AUSD'|'DOT'|'XBTC'|'LDOT'|'RENBTC' | number | Uint8Array) => Observable<bool>> & QueryableStorageEntry<ApiType>;
      /**
       * The current members of the collective. This is stored sorted (just by value).
       **/
      members: AugmentedQuery<ApiType, () => Observable<OrderedSet>> & QueryableStorageEntry<ApiType>;
      nonces: AugmentedQuery<ApiType, (arg: AccountId | string | Uint8Array) => Observable<u32>> & QueryableStorageEntry<ApiType>;
      /**
       * Raw values for each oracle operators
       **/
      rawValues: AugmentedQueryDoubleMap<ApiType, (key1: AccountId | string | Uint8Array, key2: OracleKey | 'ACA'|'AUSD'|'DOT'|'XBTC'|'LDOT'|'RENBTC' | number | Uint8Array) => Observable<Option<TimestampedValueOf>>> & QueryableStorageEntry<ApiType>;
      /**
       * Session key for oracle operators
       **/
      sessionKeys: AugmentedQuery<ApiType, (arg: AccountId | string | Uint8Array) => Observable<Option<AuthorityId>>> & QueryableStorageEntry<ApiType>;
      /**
       * Combined value, may not be up to date
       **/
      values: AugmentedQuery<ApiType, (arg: OracleKey | 'ACA'|'AUSD'|'DOT'|'XBTC'|'LDOT'|'RENBTC' | number | Uint8Array) => Observable<Option<TimestampedValueOf>>> & QueryableStorageEntry<ApiType>;
    };
    polkadotBridge: {
      [index: string]: QueryableStorageEntry<ApiType>;
      available: AugmentedQuery<ApiType, () => Observable<Balance>> & QueryableStorageEntry<ApiType>;
      bonded: AugmentedQuery<ApiType, () => Observable<Balance>> & QueryableStorageEntry<ApiType>;
      currentEra: AugmentedQuery<ApiType, () => Observable<EraIndex>> & QueryableStorageEntry<ApiType>;
      eraStartBlockNumber: AugmentedQuery<ApiType, () => Observable<BlockNumber>> & QueryableStorageEntry<ApiType>;
      forcedEra: AugmentedQuery<ApiType, () => Observable<Option<BlockNumber>>> & QueryableStorageEntry<ApiType>;
      mockRewardRate: AugmentedQuery<ApiType, () => Observable<Option<Rate>>> & QueryableStorageEntry<ApiType>;
      unbonding: AugmentedQuery<ApiType, () => Observable<Vec<ITuple<[Balance, EraIndex]>>>> & QueryableStorageEntry<ApiType>;
    };
    prices: {
      [index: string]: QueryableStorageEntry<ApiType>;
      /**
       * Mapping from currency id to it's locked price
       **/
      lockedPrice: AugmentedQuery<ApiType, (arg: CurrencyId | 'ACA'|'AUSD'|'DOT'|'XBTC'|'LDOT'|'RENBTC' | number | Uint8Array) => Observable<Option<Price>>> & QueryableStorageEntry<ApiType>;
    };
    stakingPool: {
      [index: string]: QueryableStorageEntry<ApiType>;
      claimedUnbond: AugmentedQueryDoubleMap<ApiType, (key1: AccountId | string | Uint8Array, key2: EraIndex | AnyNumber | Uint8Array) => Observable<Balance>> & QueryableStorageEntry<ApiType>;
      currentEra: AugmentedQuery<ApiType, () => Observable<EraIndex>> & QueryableStorageEntry<ApiType>;
      freeUnbonded: AugmentedQuery<ApiType, () => Observable<Balance>> & QueryableStorageEntry<ApiType>;
      nextEraUnbond: AugmentedQuery<ApiType, () => Observable<ITuple<[Balance, Balance]>>> & QueryableStorageEntry<ApiType>;
      totalBonded: AugmentedQuery<ApiType, () => Observable<Balance>> & QueryableStorageEntry<ApiType>;
      totalClaimedUnbonded: AugmentedQuery<ApiType, () => Observable<Balance>> & QueryableStorageEntry<ApiType>;
      unbonding: AugmentedQuery<ApiType, (arg: EraIndex | AnyNumber | Uint8Array) => Observable<ITuple<[Balance, Balance]>>> & QueryableStorageEntry<ApiType>;
      unbondingToFree: AugmentedQuery<ApiType, () => Observable<Balance>> & QueryableStorageEntry<ApiType>;
    };
    tokens: {
      [index: string]: QueryableStorageEntry<ApiType>;
      /**
       * The balance of a token type under an account.
       * 
       * NOTE: If the total is ever zero, decrease account ref account.
       * 
       * NOTE: This is only used in the case that this module is used to store balances.
       **/
      accounts: AugmentedQueryDoubleMap<ApiType, (key1: AccountId | string | Uint8Array, key2: CurrencyId | 'ACA'|'AUSD'|'DOT'|'XBTC'|'LDOT'|'RENBTC' | number | Uint8Array) => Observable<AccountData>> & QueryableStorageEntry<ApiType>;
      /**
       * Any liquidity locks of a token type under an account.
       * NOTE: Should only be accessed when setting, changing and freeing a lock.
       **/
      locks: AugmentedQueryDoubleMap<ApiType, (key1: AccountId | string | Uint8Array, key2: CurrencyId | 'ACA'|'AUSD'|'DOT'|'XBTC'|'LDOT'|'RENBTC' | number | Uint8Array) => Observable<Vec<BalanceLock>>> & QueryableStorageEntry<ApiType>;
      /**
       * The total issuance of a token type.
       **/
      totalIssuance: AugmentedQuery<ApiType, (arg: CurrencyId | 'ACA'|'AUSD'|'DOT'|'XBTC'|'LDOT'|'RENBTC' | number | Uint8Array) => Observable<Balance>> & QueryableStorageEntry<ApiType>;
    };
  }

  export interface QueryableStorage<ApiType extends ApiTypes> extends AugmentedQueries<ApiType> {
    [index: string]: QueryableModuleStorage<ApiType>;
  }
}
