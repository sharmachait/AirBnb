import React from 'react';

const Perks = ({ perks, setPerks }) => {

  function handleClick(ev) {
    const { checked, name } = ev.target;
    if (checked)
      setPerks([...perks, name]);
    else
      setPerks([...perks.filter(x => x != name)]);
  }

  return (
    <>
      <div className="grid mt-2 gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
        <label className="border p-4 flex rounded-2xl gap-2 justify-center cursor-pointer items-center">
          <input type="checkbox" checked={perks.includes('wifi')} name="wifi" onChange={(e) => { handleClick(e); }} />
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.288 15.038a5.25 5.25 0 0 1 7.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 0 1 1.06 0Z" />
          </svg>
          <span>Wifi</span>
        </label>
        <label className="border p-4 flex rounded-2xl gap-2 justify-center cursor-pointer items-center">
          <input type="checkbox" checked={perks.includes('parking')} name="parking" onChange={(e) => { handleClick(e); }} />
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
          </svg>
          <span>Free Parking</span>
        </label>
        <label className="border p-4 flex rounded-2xl gap-2 justify-center cursor-pointer items-center">
          <input type="checkbox" checked={perks.includes('tv')} name="tv" onChange={(e) => { handleClick(e); }} />
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 20.25h12m-7.5-3v3m3-3v3m-10.125-3h17.25c.621 0 1.125-.504 1.125-1.125V4.875c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125Z" />
          </svg>
          <span>TV</span>
        </label>
        <label className="border p-4 flex rounded-2xl gap-2 justify-center cursor-pointer items-center">
          <input type="checkbox" checked={perks.includes('pets')} name="pets" onChange={(e) => { handleClick(e); }} />
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 0 1-6.364 0M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z" />
          </svg>
          <span>Pets</span>
        </label>
        <label className="border p-4 flex rounded-2xl gap-2 justify-center cursor-pointer items-center">
          <input type="checkbox" checked={perks.includes('entrance')} name="entrance" onChange={(e) => { handleClick(e); }} />
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
          </svg>

          <span>Private Entrance</span>
        </label>
        <label className="border p-4 flex rounded-2xl gap-2 justify-center cursor-pointer items-center">
          <input type="checkbox" checked={perks.includes('backup')} name="backup" onChange={(e) => { handleClick(e); }} />
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 10.5h.375c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125H21M4.5 10.5H18V15H4.5v-4.5ZM3.75 18h15A2.25 2.25 0 0 0 21 15.75v-6a2.25 2.25 0 0 0-2.25-2.25h-15A2.25 2.25 0 0 0 1.5 9.75v6A2.25 2.25 0 0 0 3.75 18Z" />
          </svg>
          <span>Electric Backup</span>
        </label>
      </div></>
  );
}

export default Perks;