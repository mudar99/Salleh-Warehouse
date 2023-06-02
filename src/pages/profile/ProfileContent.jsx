import React from "react";

const ProfileContent = () => {
  return (
    <div className="profileContent">
      <div className="wrapper">
        <div className="profile-card js-profile-card">
          <div className="profile-card__img">
            <img src="/Img/Cover.jpg" alt="profile card" />
          </div>

          <div className="profile-card__cnt js-profile-cnt">
            <div className="profile-card__name">
              <i className="fa fa-check"></i> Mudar AF
            </div>
            <div className="profile-card__txt">
              Storehouse Name: <strong>Abo Fakher SH-1</strong>
            </div>
            <div className="profile-card__txt">
              Email: <strong>mudarabofakher@gmail.com</strong>
            </div>
            <div className="profile-card__txt">
              Phone Number: <strong>0935150221</strong>
            </div>
            <div className="profile-card-loc">
              <span className="profile-card-loc__txt">Damascus, Syria</span>
              <span className="profile-card-loc__icon">
                <i class="bi bi-geo-alt"></i>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileContent;
