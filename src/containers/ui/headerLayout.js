import { Button, ButtonGroup } from "reactstrap";
import Breadcrumb from "components/custom/Breadcrumb";
import { Separator } from "components/common/CustomBootstrap";
import { useState } from "react";
const HeaderLayout = ({
  title,
  match,
  addName,
  onSearch,
  hasSearch,
  searchInputRef,
  searchOptions,
  onAdd,
}) => {
  const [selectedRadio, setSelectedRadio] = useState(0);
  return (
    <>
      <div>
        <div className="d-flex justify-content-between mb-5">
          <Breadcrumb title={title} list={match} />
          <Button
            color="primary"
            size="lg"
            className="top-right-button mr-1"
            onClick={onAdd}
          >
            {addName}
          </Button>
        </div>
        {hasSearch && (
          <div className="d-flex align-items-center mb-5">
            <form
              onSubmit={(e) => onSearch(e, selectedRadio)}
              className="d-flex align-items-center"
            >
              <div className="search-sm d-inline-block float-md-left mr-3 align-top">
                <input
                  type="text"
                  name="search"
                  id="search"
                  placeholder="سرچ"
                  ref={searchInputRef}
                />
              </div>
              <ButtonGroup>
                {searchOptions.map((s) => (
                  <Button
                    key={s.id}
                    color="primary"
                    onClick={() => setSelectedRadio(s.id)}
                    active={selectedRadio === s.id}
                  >
                    {s.name}
                  </Button>
                ))}
              </ButtonGroup>
            </form>
          </div>
        )}
      </div>
      <Separator className="mb-5" />
    </>
  );
};

export default HeaderLayout;
