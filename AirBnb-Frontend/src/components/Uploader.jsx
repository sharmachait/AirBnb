const Uploader = ({ photoLink, setPhotoLink, addPhotoByLink, photos, uploadPhoto }) => {
  return (
    <div>
      <div className="flex gap-2">
        <input type="text" value={photoLink} onChange={(e) => { setPhotoLink(e.target.value) }} placeholder="Add a link"></input>
        <button className="bg-gray-200 px-4 rounded-2xl" onClick={addPhotoByLink}>Add&nbsp;Photo</button>
      </div>
      <div className="mt-2 grid gap-3 grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {photos.length > 0 && (photos.map((x, i) => (
          <div key={i} className="h-32 flex">
            <img className="rounded-2xl w-full object-cover" src={"http://localhost:3000/uploads/" + x} />
          </div>
        )))}
        <label className="cursor-pointer flex items-center justify-center gap-2 border bg-transparent text-2xl rounded-2xl h-32 text-gray-500">
          <input type="file" multiple className="hidden" onChange={uploadPhoto} />
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z" />
          </svg>
          <div>Upload</div>
        </label>
      </div>
    </div>
  );
}

export default Uploader;