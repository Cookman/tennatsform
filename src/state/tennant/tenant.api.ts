import {createPOSTRequest} from "../../utils/api.axios";
import {Tenant} from "./tenant.types";
import {URLS} from "../../utils/URLS";

const tenantApi = {
    createTenant: createPOSTRequest<Tenant>(URLS.CREATE_TENANT)
}

export default tenantApi