import React, { useState, useEffect } from "react";
import * as client from "../client";
import Toast from "../Components/Toast";
import  { useNavigate } from "react-router-dom";
import { FaAngleLeft } from "react-icons/fa";

export default function Company() {
    const navigate = useNavigate();
    const [company, setCompany] = useState({name: "", address: "", phone: ""});
    const [user, setUser] = useState();
    const [originalCompany, setOriginalCompany] = useState(null);
    const [showToast, setShowToast] = useState(false);

    const fetchCompany = async () => {
        setOriginalCompany(null);
        const account = await client.account();
        setUser(account);
        if (account.company !== null) {
            const c = await client.findCompanyById(account.company);
            setCompany(c);
            setOriginalCompany(c);
        }
    };

    useEffect(() => {
      fetchCompany();
    }, []);

    const reset = () => {
        fetchCompany();
    }

    const saveChanges = async () => {
        if (originalCompany !== null) {
            const updatedCompany = {
                ...company, 
                _id: company._id,
            }
            await client.updateCompany(updatedCompany);
        } else {
            const c = await client.addCompany(company);
            await client.updateUser({
                ...user,
                company: c._id
            });
        }
        
        setShowToast(true);
        setTimeout(() => {
            setShowToast(false);
        }, 5000);
    }

    return (
      <div>
          <div>
          <div className="row mt-3">
                <div className="col-12">
                    <div className="link-primary text-decoration-underline" role="button" onClick={() => window.history.back()}>
                        <FaAngleLeft /> Back
                    </div>
                </div>
            </div>
            <h1 className="mt-3">My Company Page</h1>
            <div className="card mb-2">
              <div className="card-body">
                <h6 className="card-subtitle mb-3 text-muted row"><div className="col-lg-7 col-md-8 col-12 d-flex align-items-center"><p className="text-nowrap mb-0">Name:</p> <input className="form-control ms-3" type="text" value={company.name} onChange={(e) => setCompany({...company, name: e.target.value})} /></div></h6>
                <h6 className="card-subtitle mb-3 text-muted row"><div className="col-lg-7 col-md-8 col-12 d-flex align-items-center"><p className="text-nowrap mb-0">Address:</p> <input className="form-control ms-3" type="text" value={company.address} onChange={(e) => setCompany({...company, address: e.target.value})} /></div></h6>
                <h6 className="card-subtitle mb-3 text-muted row"><div className="col-lg-7 col-md-8 col-12 d-flex align-items-center"><p className="text-nowrap mb-0">Phone:</p> <input className="form-control ms-3" type="tel" value={company.phone} onChange={(e) => setCompany({...company, phone: e.target.value})} /></div></h6>
                <div className="mt-3 float-end">
                  <button className="btn btn-light border me-2" onClick={reset}>Discard Changes</button>
                  <button className="btn btn-primary" onClick={saveChanges}>Save</button>
                  <Toast setShowToast={setShowToast} showToast={showToast} message={"Changes saved!"} />
                </div>
              </div>
            </div>
          </div>
      </div>
    );
}