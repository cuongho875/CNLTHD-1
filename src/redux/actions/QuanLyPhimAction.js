import { quanLyPhimService } from "../../services/QuanLyPhimService";
import { SET_DANH_SACH_PHIM, SET_THONG_TIN_PHIM } from "./types/QuanLyPhimType";
import { history } from "../../App";

export const layDanhSachPhimAction = (tenPhim = "") => {
  return async (dispatch) => {
    try {
      // sử dụng thamSo
      const result = await quanLyPhimService.layDanhSachPhim(tenPhim);
      console.log("result: ", result);

      // sau khi lấy dữ liệu từ api về => redux (reducer)
      dispatch({
        type: SET_DANH_SACH_PHIM,
        arrFilms: result.data.content,
      });
    } catch (error) {
      console.log("error: ", error);
    }
  };
};

export const themPhimUploadHinhAction = (formData) => {
  return async (dispatch) => {
    try {
      const result = await quanLyPhimService.themPhimUploadHinh(formData);
      alert("Thêm thành công");
      console.log("result: ", result.data.content);
      dispatch(layDanhSachPhimAction);
      history.push("/admin/films");
    } catch (error) {
      console.log("error: ", error.response?.data);
    }
  };
};

export const layThongTinPhimAction = (maPhim) => {
  return async (dispatch) => {
    try {
      const result = await quanLyPhimService.layThongTinPhim(maPhim);
      dispatch({
        type: SET_THONG_TIN_PHIM,
        thongTinPhim: result.data.content,
      });
    } catch (error) {
      console.log("error: ", error.response?.data);
    }
  };
};

export const capNhatPhimUploadAction = (formData) => {
  return async (dispatch) => {
    try {
      const result = await quanLyPhimService.capNhatPhimUpload(formData);
      alert("cập nhật thành công");
      console.log("result: ", result.data.content);

      dispatch(layDanhSachPhimAction);
      history.push("/admin/films");
    } catch (error) {
      console.log("error: ", error.response?.data);
    }
  };
};

export const xoaPhimAction = (maPhim) => {
  return async (dispatch) => {
    try {
      const result = await quanLyPhimService.xoaPhim(maPhim);
      alert("Xoá phim thành công");
      //   sau khi xóa load lại danh sách phim mới
      dispatch(layDanhSachPhimAction());
    } catch (error) {
      console.log("error: ", error.response?.data);
    }
  };
};
