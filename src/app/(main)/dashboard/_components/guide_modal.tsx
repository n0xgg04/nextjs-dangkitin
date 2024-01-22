"use client";
import * as React from "react";
import { useAppSelector } from "lta/hooks/redux";
import { useRouter } from "next/navigation";
import { useImperativeHandle } from "react";

type Props = {};
export default React.forwardRef(function GuideModel(props: Props, ref) {
	const modalRef = React.useRef<HTMLDialogElement>(null);

	useImperativeHandle(
		ref,
		() => {
			return {
				openModal: () => {
					modalRef?.current?.showModal();
				},
				closeModal: () => modalRef?.current?.close(),
			};
		},
		[],
	);

	return (
		<div>
			<dialog ref={modalRef} className="modal">
				<div className="modal-box">
					<h3 className="font-bold text-lg">Hướng dẫn sử dụng</h3>
					<p className="py-4 text-sm">
						1. Hãy nhập đúng thông tin môn cần đăng ký và ấn Thêm,
						hãy thêm môn trước thời gian đăng ký ít nhất trước 1
						tiếng
					</p>
					<p className="py-4 text-sm">
						2. Nhớ rằng chọn đúng thời điểm hệ thống mở đăng ký để
						count-down hiển thị đúng, 5 phút trước thời điểm mở, hãy
						ấn Khởi tạo
					</p>
					<p className="py-4 text-sm">
						3. Vào thời điểm đăng ký, hãy ấn Bắt đầu đăng ký
					</p>

					<p className="py-4 text-sm italic">
						Lưu ý: Thời điểm đăng ký nếu bị lỗi, hãy thực hiện ấn
						Trở lại và ấn Bắt đầu đăng ký lại. Thường thì các ngành
						HOT như CNTT, phải khoảng sau 5-10 phút, hệ thống đăng
						ký của qldt mới có thể sử dụng do quá tải. Vì vậy nếu
						lỗi, hãy thử đi thử lại tới phút thứ 10 sau thời điểm
						đăng ký
					</p>

					<p className="py-4 text-sm">
						<strong>Quan trọng</strong> : KHÔNG ĐƯỢC ĐĂNG NHẬP QLDT
						TRONG KHI SỬ DỤNG, ĐIỀU NÀY SẼ LÀM MẤT QUYỀN CHẠY TOOL
					</p>
					<div className="modal-action">
						<form method="dialog">
							<button className="btn">Đóng</button>
						</form>
					</div>
				</div>
			</dialog>
		</div>
	);
});
