export default function MovieSearch() {
  return (
    <>
      <h3>Movie Search Component</h3>
      <div className="row g-3 align-items-center">
          <div className="col-auto">
            <label className="col-form-label">Search</label>
          </div>
          <div className="col-auto">
            <input type="search" id="search" className="form-control" />
          </div>
      </div>
    </>
  )
}