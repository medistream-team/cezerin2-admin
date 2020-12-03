import React from 'react';

import messages from 'lib/text';
import * as helper from 'lib/helper';
import moment from 'moment';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Divider from 'material-ui/Divider';
import style from './style.css';

const OrderTotals = ({ order, settings }) => {
	const discountTotal = helper.formatCurrency(order.discount_total, settings);
	const subtotal = helper.formatCurrency(order.subtotal, settings);
	const taxIncludedTotal = helper.formatCurrency(
		order.tax_included_total,
		settings
	);
	const taxTotal = helper.formatCurrency(order.tax_total, settings);
	const shippingTotal = helper.formatCurrency(order.shipping_total, settings);
	const grandTotal = helper.formatCurrency(order.grand_total, settings);
	const itemTax = helper.formatCurrency(order.item_tax, settings);
	const shippingTax = helper.formatCurrency(order.shipping_tax, settings);
	const shippingDiscount = helper.formatCurrency(
		order.shipping_discount,
		settings
	);
	const shippingPrice = helper.formatCurrency(order.shipping_price, settings);
	const discountsDescription =
		order.coupon && order.coupon.length > 0
			? ` (${messages.coupon}: ${order.coupon})`
			: '';

	let transactionsTotal = 0;

	const tr = (order.transcation || []).concat(order.transactions);
	let impUid,
		buyerName,
		paidAt = '';

	for (const transaction of tr) {
		if (transaction.status === 'paid') {
			transactionsTotal += transaction.amount;
			const { imp_uid, buyer_name, paid_at } = transaction;
			const paidAtFormated = moment(new Date(paid_at * 1000)).format(
				`${settings.date_format}, ${settings.time_format}`
			);
			impUid = imp_uid;
			buyerName = buyer_name;
			paidAt = paidAtFormated;
		}
	}

	// ::MARK : 오타로 결제금액이 안나옴 오타전까지 이걸로 감
	// for (const transaction of order.transactions) {
	// 	if (transaction.success === true) {
	// 		transactionsTotal += transaction.amount;
	// 	}
	// }
	const paidTotal = helper.formatCurrency(transactionsTotal, settings);

	return (
		<div>
			<div className={`${style.total} row`}>
				<div className="col-xs-7">
					<span>{messages.orderSubtotal}</span>
				</div>
				<div className="col-xs-5">{subtotal}</div>
			</div>
			<div className={`${style.total} row`}>
				<div className="col-xs-7">
					<span>{messages.orderShipping}</span>
				</div>
				<div className="col-xs-5">{shippingTotal}</div>
			</div>
			{/* <div className={`${style.total} row`}>
				<div className="col-xs-7">
					<span>{messages.orderTax}</span>
				</div>
				<div className="col-xs-5">{taxIncludedTotal}</div>
			</div> */}
			<div className={`${style.total} row`}>
				<div className="col-xs-7">
					<span>
						{messages.orderDiscount}
						{discountsDescription}
					</span>
				</div>
				<div className="col-xs-5">{discountTotal}</div>
			</div>
			<div className={`${style.total} row ${style.grandTotal}`}>
				<div className="col-xs-7">{messages.grandTotal}</div>
				<div className="col-xs-5">{grandTotal}</div>
			</div>

			<Divider
				style={{
					marginTop: 20,
					marginBottom: 20
				}}
			/>

			<div className={`${style.total} row`}>
				<div className="col-xs-7">
					<span>{messages.amountPaid}</span>
				</div>
				<div className="col-xs-5">{paidTotal}</div>
			</div>
			<div className={`${style.total} row`}>
				<div className="col-xs-7">
					<span>{`결제일시`}</span>
				</div>
				<div className="col-xs-5">{paidAt}</div>
			</div>
			<div className={`${style.total} row`}>
				<div className="col-xs-7">
					<span>{impUid}</span>
				</div>
				<div className="col-xs-5">{buyerName}</div>
			</div>
		</div>
	);
};

export default OrderTotals;
