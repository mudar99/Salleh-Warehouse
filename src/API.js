export const local = 'http://127.0.0.1:8070';

export const loginAPI = `${local}/api/store/login`;
export const logoutAPI = `${local}/api/store/logout`;
export const registerAPI = `${local}/api/store/register`;

export const GetProductsAPI = `${local}/api/store/product/get/?size=`;
export const DeleteProductAPI = `${local}/api/store/product/`;
export const UpdateProductAPI = `${local}/api/store/product/`;
export const CreateProductAPI = `${local}/api/store/product/create/`;

export const GetCategoriesAPI = `${local}/api/store/category/get/`;
export const SendAuthFilesAPI = `${local}/api/store/file/send`;

export const SendVerCodeAPI = `${local}/api/store/mail`;
export const VerificationAPI = `${local}/api/store/mail/verify`;

export const GetPurchaseOrdersAPI = `${local}/api/store/store/purchase/order/get`;
export const AcceptPurchaseOrderAPI = `${local}/api/store/store/purchase/order/accept/`;
export const RejectPurchaseOrderAPI = `${local}/api/store/store/purchase/order/reject/`;

export const CreateWalletAPI = `${local}/api/users/wallets/new`;
export const GetMyBalanceAPI = `${local}/api/users/wallets/balance`;
export const GetWalletStatusAPI = `${local}/api/users/wallets/status`;

export const AddSuggestionAPI = `${local}/api/users/suggestion/add`;
export const GetSuggestionsAPI = `${local}/api/users/suggestions?size=`;

export const AddComplaintAPI = `${local}/api/users/complaint/add`;
export const GetComplaintsAPI = `${local}/api/users/complaints?size=`;