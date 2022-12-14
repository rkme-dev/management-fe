import Vue from 'vue'
import Vuex from 'vuex'
import { AccountStore } from '@/store/AccountStore'
import { AuthStore } from '@/store/AuthStore'
import { CollectionStore } from '@/store/CollectionStore'
import { DepositStore } from '@/store/DepositStore'
import { DocumentStore } from '@/store/DocumentStore'
import { LocationStore } from '@/store/LocationStore'
import { UserAccessManagementStore } from '@/store/UserAccessManagementStore'
import { ReleaseOrderStore } from '@/store/ReleaseOrderStore'
import { WarehouseStore } from '@/store/WarehouseStore'
import { SalesmanStore } from '@/store/SalesmanStore'
import { TermStore } from '@/store/TermStore'
import { VatStore } from '@/store/VatStore'
import { CustomerStore } from '@/store/CustomerStore'
import { PhysicalCountStore } from '@/store/PhysicalCountStore'
import { ProductStore } from '@/store/ProductStore'
import { SalesOrderStore } from '@/store/SalesOrderStore'
import { SalesDrStore } from '@/store/SalesDrStore'
import { UnitPackingStore } from '@/store/UnitPackingStore'
import { FinishProductStore } from '@/store/FinishProductStore'
import { RawMaterialStore } from '@/store/RawMaterialStore'
import { TripTicketStore } from '@/store/TripTicketStore'
import { ReportStore } from '@/store/ReportStore'
import { BouncedDepositStore } from '@/store/BouncedDepositStore'
import { StockRequestStore } from '@/store/StockRequestStore'
import customers from './customers.module'
import products from './products.module'
import suppliers from './suppliers.module'
import purchaseOrders from './purchase-orders-module'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    AuthStore,
    BouncedDepositStore,
    CollectionStore,
    CustomerStore,
    DepositStore,
    DocumentStore,
    customers,
    products,
    purchaseOrders,
    suppliers,
    UserAccessManagementStore,
    ReleaseOrderStore,
    WarehouseStore,
    PhysicalCountStore,
    TermStore,
    VatStore,
    SalesmanStore,
    AccountStore,
    LocationStore,
    ProductStore,
    ReportStore,
    SalesOrderStore,
    SalesDrStore,
    StockRequestStore,
    UnitPackingStore,
    FinishProductStore,
    RawMaterialStore,
    TripTicketStore,
  },
})
