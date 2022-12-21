// مقدار فیک برای رندر ایتم ها
const nums = [1, 2, 3, 4];

export default function HomeRow({ title, list }) {
  // این متغییر بر اساس لیستی که به عنوان ورودی دریافت میشه ایتم های با سه ستون را رندر میکند
  const renderItems = nums.map((num) => (
    <div className="col-3" key={num}>
      <div className=" d-flex flex-column justify-content-around align-items-center  min-h-150 radius p-3">
        <i className="iconsminds-clock font-30"></i>
        <span>پرداخت با ویزا مستر</span>
      </div>
    </div>
  ));

  return (
    <>
      <h3 className="mb-3 ">{title}</h3>
      <div className="container-fluid mb-5">
        <div className="row">{renderItems}</div>
      </div>
    </>
  );
}
