export type Undefable<T> = T | undefined;
export type Nullable<T> = T | null;

export type RowTableData = {
    ma_mon: string;
    so_tin: string;
    ten_mon: string;
    nhom_to: string;
    lop: string;
};

export type SubjectFullType = {
    total_items: number;
    total_pages: number;
    so_tin_chi_min: number;
    ngay_in: string;
    is_show_nganh_hoc: boolean;
    ds_kqdkmh: MonHocType[];
};

export type MonHocType = {
    dien_giai_enable_xoa: string;
    enable_xoa: boolean;
    hoc_phi_tam_tinh: number;
    id_kqdk: string;
    is_da_rut_mon_hoc: boolean;
    nguoi_dang_ky: string;
    ngay_dang_ky: string;
    to_hoc: {
        enable: boolean;
        hauk: boolean;
        id_mon: string;
        id_to_hoc: string;
        lop: string;
        ma_mon: string;
        nhom_to: string;
        so_tc: string;
        ten_mon: string;
        tkb: string;
    };
};

export type PlanType = {
    ma_mon: string;
    to: string;
    lop: string;
    nhom: string;
}[];
