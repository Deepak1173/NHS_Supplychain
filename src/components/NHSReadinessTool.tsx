
"use client";

import React, { useState } from 'react';
import { ChevronRight, FileText, BarChart3, ShieldCheck, Printer, ArrowLeft, CheckCircle2, AlertTriangle, AlertCircle } from 'lucide-react';

const formSteps = [
  'company_profile',
  'nhs_details',
  'crp_status',
  'scope_1_2',
  'scope_3',
  'evidence',
  'reduction_planning',
];

const stepTitles: Record<string, string> = {
  company_profile: 'Company Profile',
  nhs_details: 'NHS Supplier Details',
  crp_status: 'Carbon Reduction Plan',
  scope_1_2: 'Scope 1 & 2 Emissions',
  scope_3: 'Scope 3 Emissions',
  evidence: 'Evidence Checklist',
  reduction_planning: 'Reduction Action Planning',
};

const RadioGroup = ({ name, label, formData, handleChange }: { name: string, label: string, formData: Record<string, string>, handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void }) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-slate-700 mb-2">{label}</label>
    <div className="flex gap-4">
      <label className="flex items-center gap-2 cursor-pointer text-slate-700">
        <input type="radio" name={name} value="yes" checked={formData[name] === 'yes'} onChange={handleChange} className="w-4 h-4 text-emerald-600 focus:ring-emerald-500" />
        Yes
      </label>
      <label className="flex items-center gap-2 cursor-pointer text-slate-700">
        <input type="radio" name={name} value="no" checked={formData[name] === 'no'} onChange={handleChange} className="w-4 h-4 text-emerald-600 focus:ring-emerald-500" />
        No
      </label>
    </div>
  </div>
);

const TextInput = ({ name, label, placeholder = '', formData, handleChange }: { name: string, label: string, placeholder?: string, formData: Record<string, string>, handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void }) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-slate-700 mb-1">{label}</label>
    <input type="text" name={name} value={formData[name]} onChange={handleChange} placeholder={placeholder} className="w-full border-slate-300 rounded-md shadow-sm focus:border-emerald-500 focus:ring-emerald-500 p-2 border text-slate-800" />
  </div>
);

export default function NHSReadinessTool() {
  const [currentView, setCurrentView] = useState('landing'); // landing, form, dashboard, report
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const [formData, setFormData] = useState<Record<string, string>>({
    company_name: '',
    sector: '',
    subsector: '',
    supplier_type: '',
    annual_turnover_band: '',
    employee_count_band: '',
    number_of_sites: '',
    main_products_services: '',
    public_website: '',
    nhs_supplier_status: '',
    nhs_contract_value_band: '',
    supplies_goods_or_services: '',
    medical_category: '',
    current_tender_activity: '',
    has_carbon_reduction_plan: '',
    crp_publicly_available: '',
    crp_public_url: '',
    baseline_year: '',
    reporting_year: '',
    net_zero_target_year: '',
    includes_scope_1: '',
    includes_scope_2: '',
    includes_scope_3: '',
    includes_reduction_actions: '',
    includes_board_approval: '',
    includes_methodology: '',
    gas_data_available: '',
    fleet_data_available: '',
    fuel_data_available: '',
    electricity_data_available: '',
    renewable_electricity_evidence: '',
    refrigerant_data_checked: '',
    purchased_goods_data_available: '',
    transport_data_available: '',
    waste_data_available: '',
    business_travel_data_available: '',
    employee_commuting_data_available: '',
    packaging_data_available: '',
    supplier_emissions_data_available: '',
    energy_bills_uploaded: '',
    fuel_records_uploaded: '',
    fleet_records_uploaded: '',
    waste_records_uploaded: '',
    supplier_data_uploaded: '',
    packaging_data_uploaded: '',
    logistics_data_uploaded: '',
    sustainability_policy_uploaded: '',
    board_approval_uploaded: '',
    public_reporting_link_available: '',
    actions_identified: '',
    actions_prioritised: '',
    owners_assigned: '',
    timelines_assigned: '',
    estimated_impact_included: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleNext = () => {
    if (currentStepIndex < formSteps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
      window.scrollTo(0, 0);
    } else {
      setCurrentView('dashboard');
      window.scrollTo(0, 0);
    }
  };

  const handleBack = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
      window.scrollTo(0, 0);
    } else {
      setCurrentView('landing');
    }
  };

  const startAssessment = () => {
    setCurrentView('form');
    setCurrentStepIndex(0);
    window.scrollTo(0, 0);
  };

  // Logic
  const getScore = () => {
    let crpScore = 0;
    if (formData.has_carbon_reduction_plan === 'yes') crpScore += 4;
    if (formData.crp_publicly_available === 'yes') crpScore += 4;
    if (formData.baseline_year) crpScore += 3;
    if (formData.reporting_year) crpScore += 3;
    if (formData.includes_scope_1 === 'yes') crpScore += 2;
    if (formData.includes_scope_2 === 'yes') crpScore += 2;
    if (formData.includes_scope_3 === 'yes') crpScore += 3;
    if (formData.includes_reduction_actions === 'yes') crpScore += 2;
    if (formData.includes_board_approval === 'yes') crpScore += 1;
    if (formData.includes_methodology === 'yes') crpScore += 1;
    
    let s12Score = 0;
    if (formData.gas_data_available === 'yes') s12Score += 4;
    if (formData.fleet_data_available === 'yes') s12Score += 3;
    if (formData.electricity_data_available === 'yes') s12Score += 4;
    if (formData.renewable_electricity_evidence === 'yes') s12Score += 2;
    if (formData.refrigerant_data_checked === 'yes') s12Score += 2;

    let s3Score = 0;
    if (formData.purchased_goods_data_available === 'yes') s3Score += 4;
    if (formData.transport_data_available === 'yes') s3Score += 3;
    if (formData.waste_data_available === 'yes') s3Score += 3;
    if (formData.business_travel_data_available === 'yes') s3Score += 2;
    if (formData.employee_commuting_data_available === 'yes') s3Score += 2;
    if (formData.packaging_data_available === 'yes') s3Score += 3;
    if (formData.supplier_emissions_data_available === 'yes') s3Score += 3;

    let evergreenScore = 0;
    const nhsActive = ['completed', 'active', 'yes', 'current'].includes(formData.nhs_supplier_status?.toLowerCase());
    if (nhsActive) evergreenScore += 3;
    if (formData.sustainability_policy_uploaded === 'yes') evergreenScore += 3;
    if (formData.net_zero_target_year) evergreenScore += 3;
    if (formData.supplier_emissions_data_available === 'yes') evergreenScore += 2;
    if (formData.includes_reduction_actions === 'yes') evergreenScore += 2;
    if (formData.public_reporting_link_available === 'yes') evergreenScore += 2;

    let evidenceScore = 0;
    if (formData.energy_bills_uploaded === 'yes') evidenceScore += 3;
    if (formData.fuel_records_uploaded === 'yes') evidenceScore += 2;
    if (formData.waste_records_uploaded === 'yes') evidenceScore += 2;
    if (formData.supplier_data_uploaded === 'yes') evidenceScore += 3;
    if (formData.public_reporting_link_available === 'yes') evidenceScore += 2;
    if (formData.board_approval_uploaded === 'yes') evidenceScore += 1;
    if (formData.logistics_data_uploaded === 'yes') evidenceScore += 2;

    let actionScore = 0;
    if (formData.actions_identified === 'yes') actionScore += 3;
    if (formData.actions_prioritised === 'yes') actionScore += 2;
    if (formData.owners_assigned === 'yes') actionScore += 2;
    if (formData.timelines_assigned === 'yes') actionScore += 2;
    if (formData.estimated_impact_included === 'yes') actionScore += 1;

    const totalScore = crpScore + s12Score + s3Score + evergreenScore + evidenceScore + actionScore;

    let riskBand = '';
    let riskColor = '';
    if (totalScore <= 39) { riskBand = 'High Risk: Not procurement ready'; riskColor = 'text-red-600'; }
    else if (totalScore <= 59) { riskBand = 'Medium-High Risk: Major gaps exist'; riskColor = 'text-orange-600'; }
    else if (totalScore <= 74) { riskBand = 'Medium Risk: Basic readiness but weak evidence'; riskColor = 'text-yellow-600'; }
    else if (totalScore <= 89) { riskBand = 'Low Risk: Mostly ready'; riskColor = 'text-green-600'; }
    else { riskBand = 'Strong Readiness'; riskColor = 'text-emerald-700'; }

    return { totalScore, crpScore, s12Score, s3Score, evergreenScore, evidenceScore, actionScore, riskBand, riskColor };
  };

  const score = getScore();

  const getMissingEvidence = () => {
    const missing = [];
    if (formData.energy_bills_uploaded !== 'yes') missing.push("Energy bills");
    if (formData.fuel_records_uploaded !== 'yes') missing.push("Fuel records");
    if (formData.waste_records_uploaded !== 'yes') missing.push("Waste records");
    if (formData.supplier_data_uploaded !== 'yes') missing.push("Supplier data");
    if (formData.packaging_data_uploaded !== 'yes') missing.push("Packaging data");
    if (formData.logistics_data_uploaded !== 'yes') missing.push("Logistics data");
    if (formData.sustainability_policy_uploaded !== 'yes') missing.push("Sustainability policy");
    if (formData.board_approval_uploaded !== 'yes') missing.push("Board approval");
    if (formData.public_reporting_link_available !== 'yes') missing.push("Public reporting link");
    return missing;
  };

  const getRecommendations = () => {
    const recs = [];
    if (formData.has_carbon_reduction_plan !== 'yes') {
      recs.push("Create a Carbon Reduction Plan with baseline year, current reporting year, Scope 1/2/3 emissions, reduction actions, and senior approval.");
    }
    if (formData.has_carbon_reduction_plan === 'yes' && formData.crp_publicly_available !== 'yes') {
      recs.push("Publish the Carbon Reduction Plan on a public webpage and add the link to tender evidence.");
    }
    if (formData.purchased_goods_data_available !== 'yes' || formData.transport_data_available !== 'yes' || formData.waste_data_available !== 'yes' || formData.business_travel_data_available !== 'yes' || formData.employee_commuting_data_available !== 'yes' || formData.packaging_data_available !== 'yes' || formData.supplier_emissions_data_available !== 'yes') {
      recs.push("Prioritise Scope 3 data collection for purchased goods, transport, waste, business travel, employee commuting, packaging, and supplier emissions.");
    }
    if (formData.energy_bills_uploaded !== 'yes' || formData.fuel_records_uploaded !== 'yes' || formData.waste_records_uploaded !== 'yes' || formData.logistics_data_uploaded !== 'yes' || formData.supplier_data_uploaded !== 'yes' || formData.board_approval_uploaded !== 'yes') {
      recs.push("Create a supplier evidence vault containing energy bills, fuel records, waste records, logistics data, supplier questionnaires, and board approval evidence.");
    }
    if (formData.actions_identified !== 'yes' || formData.owners_assigned !== 'yes' || formData.timelines_assigned !== 'yes' || formData.estimated_impact_included !== 'yes') {
      recs.push("Create a 30/60/90-day action plan with owners, timelines, and estimated carbon/procurement impact.");
    }
    return recs;
  };

      return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-4xl mx-auto">
        
        {/* LANDING */}
        {currentView === 'landing' && (
          <div className="space-y-12">
            <div className="text-center">
              <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight sm:text-5xl mb-4">
                NHS Supplier Carbon Readiness Tool
              </h1>
              <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                Prepare your organisation for NHS net-zero procurement expectations through carbon evidence, CRP gap analysis, Scope 1–3 visibility, and practical action planning.
              </p>
              <div className="mt-8 text-sm text-slate-500 bg-slate-50 p-4 rounded-lg inline-block border border-slate-200">
                <span className="font-semibold text-slate-700">Important Note:</span> This tool supports preparation and provides a readiness assessment and gap analysis. It does not certify NHS compliance or claim NHS approval.
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <FileText className="h-10 w-10 text-emerald-600 mb-4" />
                <h3 className="text-lg font-bold text-slate-900 mb-2">Carbon Reduction Plan Checker</h3>
                <p className="text-slate-600">Evaluate your CRP against key criteria and identify gaps in reporting and commitments.</p>
              </div>
              <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <BarChart3 className="h-10 w-10 text-emerald-600 mb-4" />
                <h3 className="text-lg font-bold text-slate-900 mb-2">Scope 1–3 Data Readiness</h3>
                <p className="text-slate-600">Assess your visibility into direct emissions, indirect energy emissions, and value chain impact.</p>
              </div>
              <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <ShieldCheck className="h-10 w-10 text-emerald-600 mb-4" />
                <h3 className="text-lg font-bold text-slate-900 mb-2">NHS Supplier Evidence Gap Analysis</h3>
                <p className="text-slate-600">Identify missing documentation to build your procurement evidence support vault.</p>
              </div>
            </div>

            <div className="text-center mt-12">
              <button 
                onClick={startAssessment}
                className="inline-flex items-center px-8 py-4 border border-transparent text-lg font-medium rounded-lg shadow-sm text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-colors"
              >
                Start Readiness Assessment
                <ChevronRight className="ml-2 -mr-1 h-5 w-5" />
              </button>
            </div>
          </div>
        )}

        {/* FORM */}
        {currentView === 'form' && (
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="bg-slate-50 px-6 py-4 border-b border-slate-200">
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-xl font-bold text-slate-800">{stepTitles[formSteps[currentStepIndex]]}</h2>
                <span className="text-sm font-medium text-slate-500">Step {currentStepIndex + 1} of {formSteps.length}</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2">
                <div className="bg-emerald-600 h-2 rounded-full transition-all duration-300" style={{ width: `${((currentStepIndex + 1) / formSteps.length) * 100}%` }}></div>
              </div>
            </div>
            
            <div className="p-6 sm:p-8">
              {formSteps[currentStepIndex] === 'company_profile' && (
                <div className="space-y-4">
                  <TextInput name="company_name" label="Company Name" formData={formData} handleChange={handleChange} />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <TextInput name="sector" label="Sector" formData={formData} handleChange={handleChange} />
                    <TextInput name="subsector" label="Subsector" formData={formData} handleChange={handleChange} />
                    <TextInput name="supplier_type" label="Supplier Type" formData={formData} handleChange={handleChange} />
                    <TextInput name="annual_turnover_band" label="Annual Turnover Band" formData={formData} handleChange={handleChange} />
                    <TextInput name="employee_count_band" label="Employee Count Band" formData={formData} handleChange={handleChange} />
                    <TextInput name="number_of_sites" label="Number of Sites" formData={formData} handleChange={handleChange} />
                  </div>
                  <TextInput name="main_products_services" label="Main Products / Services" formData={formData} handleChange={handleChange} />
                  <TextInput name="public_website" label="Public Website URL" formData={formData} handleChange={handleChange} />
                </div>
              )}

              {formSteps[currentStepIndex] === 'nhs_details' && (
                <div className="space-y-4">
                  <TextInput name="nhs_supplier_status" label="NHS Supplier Status (e.g., Active, Prospective)" formData={formData} handleChange={handleChange} />
                  <TextInput name="nhs_contract_value_band" label="NHS Contract Value Band" formData={formData} handleChange={handleChange} />
                  <TextInput name="supplies_goods_or_services" label="Supplies Goods or Services?" formData={formData} handleChange={handleChange} />
                  <TextInput name="medical_category" label="Medical Category" formData={formData} handleChange={handleChange} />
                  <TextInput name="current_tender_activity" label="Current Tender Activity" formData={formData} handleChange={handleChange} />
                </div>
              )}

              {formSteps[currentStepIndex] === 'crp_status' && (
                <div className="space-y-4">
                  <RadioGroup name="has_carbon_reduction_plan" label="Do you have a Carbon Reduction Plan?" formData={formData} handleChange={handleChange} />
                  <RadioGroup name="crp_publicly_available" label="Is the CRP publicly available?" formData={formData} handleChange={handleChange} />
                  <TextInput name="crp_public_url" label="CRP Public URL (if available)" formData={formData} handleChange={handleChange} />
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <TextInput name="baseline_year" label="Baseline Year (e.g., 2019)" formData={formData} handleChange={handleChange} />
                    <TextInput name="reporting_year" label="Reporting Year (e.g., 2023)" formData={formData} handleChange={handleChange} />
                    <TextInput name="net_zero_target_year" label="Net Zero Target Year (e.g., 2045)" formData={formData} handleChange={handleChange} />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
                    <RadioGroup name="includes_scope_1" label="Does the CRP include Scope 1 emissions?" formData={formData} handleChange={handleChange} />
                    <RadioGroup name="includes_scope_2" label="Does the CRP include Scope 2 emissions?" formData={formData} handleChange={handleChange} />
                    <RadioGroup name="includes_scope_3" label="Does the CRP include Scope 3 emissions?" formData={formData} handleChange={handleChange} />
                    <RadioGroup name="includes_reduction_actions" label="Does it include reduction actions?" formData={formData} handleChange={handleChange} />
                    <RadioGroup name="includes_board_approval" label="Does it have board/senior management approval?" formData={formData} handleChange={handleChange} />
                    <RadioGroup name="includes_methodology" label="Is the calculation methodology included?" formData={formData} handleChange={handleChange} />
                  </div>
                </div>
              )}

              {formSteps[currentStepIndex] === 'scope_1_2' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 space-y-2 md:space-y-0">
                  <div className="col-span-full mb-4">
                    <p className="text-sm text-slate-500">Assess your visibility into direct operations and purchased energy.</p>
                  </div>
                  <RadioGroup name="gas_data_available" label="Is natural gas data available?" formData={formData} handleChange={handleChange} />
                  <RadioGroup name="fleet_data_available" label="Is company fleet data available?" formData={formData} handleChange={handleChange} />
                  <RadioGroup name="fuel_data_available" label="Are other fuel data available?" formData={formData} handleChange={handleChange} />
                  <RadioGroup name="electricity_data_available" label="Is electricity data available?" formData={formData} handleChange={handleChange} />
                  <RadioGroup name="renewable_electricity_evidence" label="Do you have renewable electricity evidence (e.g., REGOs)?" formData={formData} handleChange={handleChange} />
                  <RadioGroup name="refrigerant_data_checked" label="Have refrigerant gas losses been checked?" formData={formData} handleChange={handleChange} />
                </div>
              )}

              {formSteps[currentStepIndex] === 'scope_3' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 space-y-2 md:space-y-0">
                   <div className="col-span-full mb-4">
                    <p className="text-sm text-slate-500">Assess your value chain emission visibility.</p>
                  </div>
                  <RadioGroup name="purchased_goods_data_available" label="Data available for Purchased Goods & Services?" formData={formData} handleChange={handleChange} />
                  <RadioGroup name="transport_data_available" label="Data available for Upstream/Downstream Transport?" formData={formData} handleChange={handleChange} />
                  <RadioGroup name="waste_data_available" label="Data available for Waste Generated in Operations?" formData={formData} handleChange={handleChange} />
                  <RadioGroup name="business_travel_data_available" label="Data available for Business Travel?" formData={formData} handleChange={handleChange} />
                  <RadioGroup name="employee_commuting_data_available" label="Data available for Employee Commuting?" formData={formData} handleChange={handleChange} />
                  <RadioGroup name="packaging_data_available" label="Data available for Packaging?" formData={formData} handleChange={handleChange} />
                  <RadioGroup name="supplier_emissions_data_available" label="Data available from your suppliers' emissions?" formData={formData} handleChange={handleChange} />
                </div>
              )}

              {formSteps[currentStepIndex] === 'evidence' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 space-y-2 md:space-y-0">
                  <div className="col-span-full mb-4">
                    <p className="text-sm text-slate-500">Check which documents you have readily available for procurement evidence support.</p>
                  </div>
                  <RadioGroup name="energy_bills_uploaded" label="Energy bills available?" formData={formData} handleChange={handleChange} />
                  <RadioGroup name="fuel_records_uploaded" label="Fuel records available?" formData={formData} handleChange={handleChange} />
                  <RadioGroup name="fleet_records_uploaded" label="Fleet records available?" formData={formData} handleChange={handleChange} />
                  <RadioGroup name="waste_records_uploaded" label="Waste records available?" formData={formData} handleChange={handleChange} />
                  <RadioGroup name="supplier_data_uploaded" label="Supplier data/questionnaires available?" formData={formData} handleChange={handleChange} />
                  <RadioGroup name="packaging_data_uploaded" label="Packaging data available?" formData={formData} handleChange={handleChange} />
                  <RadioGroup name="logistics_data_uploaded" label="Logistics data available?" formData={formData} handleChange={handleChange} />
                  <RadioGroup name="sustainability_policy_uploaded" label="Sustainability policy available?" formData={formData} handleChange={handleChange} />
                  <RadioGroup name="board_approval_uploaded" label="Board approval evidence available?" formData={formData} handleChange={handleChange} />
                  <RadioGroup name="public_reporting_link_available" label="Public reporting link available?" formData={formData} handleChange={handleChange} />
                </div>
              )}

              {formSteps[currentStepIndex] === 'reduction_planning' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 space-y-2 md:space-y-0">
                  <RadioGroup name="actions_identified" label="Have reduction actions been identified?" formData={formData} handleChange={handleChange} />
                  <RadioGroup name="actions_prioritised" label="Are these actions prioritised?" formData={formData} handleChange={handleChange} />
                  <RadioGroup name="owners_assigned" label="Are owners assigned to actions?" formData={formData} handleChange={handleChange} />
                  <RadioGroup name="timelines_assigned" label="Are timelines set for actions?" formData={formData} handleChange={handleChange} />
                  <RadioGroup name="estimated_impact_included" label="Is estimated carbon impact included?" formData={formData} handleChange={handleChange} />
                </div>
              )}

            </div>
            
            <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex justify-between items-center">
              <button
                onClick={handleBack}
                className="px-4 py-2 border border-slate-300 shadow-sm text-sm font-medium rounded-md text-slate-700 bg-white hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
              >
                Back
              </button>
              <button
                onClick={handleNext}
                className="px-6 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 flex items-center"
              >
                {currentStepIndex === formSteps.length - 1 ? 'View Results' : 'Next'}
                {currentStepIndex !== formSteps.length - 1 && <ChevronRight className="ml-1 h-4 w-4" />}
              </button>
            </div>
          </div>
        )}

        {/* DASHBOARD */}
        {currentView === 'dashboard' && (
          <div className="space-y-8">
            <div className="flex justify-between items-center print:hidden">
              <button onClick={() => setCurrentView('form')} className="text-emerald-600 hover:text-emerald-700 flex items-center text-sm font-medium">
                <ArrowLeft className="h-4 w-4 mr-1" /> Back to Edit
              </button>
              <button onClick={() => setCurrentView('report')} className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-slate-800 hover:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-900">
                <FileText className="h-4 w-4 mr-2" /> Full Report
              </button>
            </div>

            <div className="bg-slate-800 rounded-2xl p-8 text-center text-white shadow-lg relative overflow-hidden">
              <div className="absolute top-0 right-0 -mt-16 -mr-16 text-emerald-500 opacity-20">
                <ShieldCheck className="h-64 w-64" />
              </div>
              <h2 className="text-2xl font-bold mb-2 relative z-10">Overall Readiness Score</h2>
              <div className="text-7xl font-extrabold text-emerald-400 mb-4 relative z-10">{score.totalScore}<span className="text-3xl text-slate-400">/100</span></div>
              <div className={`inline-block px-4 py-1 rounded-full text-lg font-semibold bg-white ${score.riskColor} relative z-10`}>
                {score.riskBand}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-bold text-slate-800 mb-4 border-b pb-2">Category Scores</h3>
                <div className="space-y-4">
                  <ScoreBar label="CRP Readiness" score={score.crpScore} max={25} />
                  <ScoreBar label="Scope 1 & 2" score={score.s12Score} max={15} />
                  <ScoreBar label="Scope 3" score={score.s3Score} max={20} />
                  <ScoreBar label="Procurement Prep" score={score.evergreenScore} max={15} />
                  <ScoreBar label="Evidence Quality" score={score.evidenceScore} max={15} />
                  <ScoreBar label="Action Plan" score={score.actionScore} max={10} />
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
                  <h3 className="text-lg font-bold text-slate-800 mb-4 border-b pb-2 flex items-center">
                    <AlertTriangle className="h-5 w-5 text-orange-500 mr-2" /> Top Missing Evidence
                  </h3>
                  {getMissingEvidence().length > 0 ? (
                    <ul className="list-disc pl-5 text-slate-600 space-y-1">
                      {getMissingEvidence().slice(0, 5).map((item, i) => <li key={i}>{item}</li>)}
                    </ul>
                  ) : (
                    <p className="text-slate-500 italic flex items-center"><CheckCircle2 className="h-4 w-4 text-emerald-500 mr-2"/> All key evidence available.</p>
                  )}
                </div>

                <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
                  <h3 className="text-lg font-bold text-slate-800 mb-4 border-b pb-2 flex items-center">
                    <CheckCircle2 className="h-5 w-5 text-emerald-500 mr-2" /> Top 5 Recommended Actions
                  </h3>
                  {getRecommendations().length > 0 ? (
                    <ul className="space-y-3">
                      {getRecommendations().slice(0, 5).map((rec, i) => (
                        <li key={i} className="flex items-start text-sm text-slate-700 bg-slate-50 p-3 rounded-md border border-slate-100">
                          <span className="bg-emerald-100 text-emerald-800 rounded-full h-5 w-5 flex items-center justify-center mr-2 flex-shrink-0 text-xs font-bold">{i+1}</span>
                          {rec}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-slate-500 italic">You have addressed the key requirements.</p>
                  )}
                </div>
              </div>
            </div>

             <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-bold text-slate-800 mb-4 border-b border-slate-200 pb-2">30/60/90-Day Roadmap (Suggested)</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <h4 className="font-bold text-emerald-700 mb-2">First 30 Days</h4>
                    <p className="text-sm text-slate-600">Gather missing evidence into a central repository. Ensure Scope 1 and 2 data is collected and verified.</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-emerald-700 mb-2">30-60 Days</h4>
                    <p className="text-sm text-slate-600">Draft or update Carbon Reduction Plan. Begin structured Scope 3 data collection starting with purchased goods.</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-emerald-700 mb-2">60-90 Days</h4>
                    <p className="text-sm text-slate-600">Obtain board approval for CRP. Establish reduction action owners and publish commitments on website.</p>
                  </div>
                </div>
              </div>
          </div>
        )}

        {/* REPORT */}
        {currentView === 'report' && (
          <div className="bg-white rounded-xl shadow-lg border border-slate-200 print:shadow-none print:border-none">
            <div className="p-8 print:p-0">
              <div className="flex justify-between items-center mb-8 print:hidden">
                <button onClick={() => setCurrentView('dashboard')} className="text-emerald-600 hover:text-emerald-700 flex items-center text-sm font-medium">
                  <ArrowLeft className="h-4 w-4 mr-1" /> Back to Dashboard
                </button>
                <button onClick={() => window.print()} className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500">
                  <Printer className="h-4 w-4 mr-2" /> Print Report
                </button>
              </div>

              <div className="border-b-4 border-emerald-600 pb-6 mb-8">
                <h1 className="text-3xl font-extrabold text-slate-900 mb-2">NHS Supplier Carbon Readiness Assessment Report</h1>
                <p className="text-slate-500">Generated for {formData.company_name || 'Your Organisation'} on {new Date().toLocaleDateString()}</p>
              </div>

              <div className="space-y-8">
                <section>
                  <h2 className="text-xl font-bold text-slate-800 mb-4 bg-slate-100 p-2 rounded-md">Executive Summary</h2>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg text-center">
                      <div className="text-sm text-slate-500 mb-1">Total Score</div>
                      <div className="text-3xl font-bold text-emerald-600">{score.totalScore}/100</div>
                    </div>
                    <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg text-center col-span-2 md:col-span-3 flex flex-col justify-center">
                      <div className="text-sm text-slate-500 mb-1">Procurement Risk Level</div>
                      <div className={`text-2xl font-bold ${score.riskColor}`}>{score.riskBand}</div>
                    </div>
                  </div>
                  <p className="text-slate-700 text-sm leading-relaxed">
                    This report provides a gap analysis of your organisation&apos;s current readiness to meet NHS net-zero procurement expectations. It covers Carbon Reduction Plan compliance, emissions data visibility across Scopes 1-3, and the availability of supporting evidence. The scores and recommendations are designed to support preparation and do not constitute NHS approval or guarantee tender success.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-bold text-slate-800 mb-4 bg-slate-100 p-2 rounded-md">Detailed Scoring Breakdown</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
                    <ScoreRow label="Carbon Reduction Plan Gap Analysis" score={score.crpScore} max={25} />
                    <ScoreRow label="Scope 1 & 2 Data Completeness" score={score.s12Score} max={15} />
                    <ScoreRow label="Scope 3 Data Completeness" score={score.s3Score} max={20} />
                    <ScoreRow label="Evergreen/Procurement Preparation" score={score.evergreenScore} max={15} />
                    <ScoreRow label="Evidence Completeness" score={score.evidenceScore} max={15} />
                    <ScoreRow label="Reduction Action Plan" score={score.actionScore} max={10} />
                  </div>
                </section>

                <section>
                  <h2 className="text-xl font-bold text-slate-800 mb-4 bg-slate-100 p-2 rounded-md">Evidence Gaps</h2>
                  {getMissingEvidence().length > 0 ? (
                    <div className="bg-orange-50 border border-orange-200 p-4 rounded-lg">
                      <p className="text-sm text-orange-800 mb-3 font-medium flex items-center">
                         <AlertCircle className="h-4 w-4 mr-2" /> The following evidence documents are currently missing or unchecked:
                      </p>
                      <ul className="list-disc pl-5 text-sm text-orange-900 grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {getMissingEvidence().map((item, i) => <li key={i}>{item}</li>)}
                      </ul>
                    </div>
                  ) : (
                    <p className="text-sm text-emerald-700 bg-emerald-50 p-4 rounded-lg border border-emerald-200">Excellent. No major evidence gaps identified based on your responses.</p>
                  )}
                </section>

                <section className="print:break-inside-avoid">
                  <h2 className="text-xl font-bold text-slate-800 mb-4 bg-slate-100 p-2 rounded-md">Recommended Actions</h2>
                  {getRecommendations().length > 0 ? (
                    <ul className="space-y-4">
                      {getRecommendations().map((rec, i) => (
                        <li key={i} className="flex items-start text-slate-800">
                          <span className="bg-slate-800 text-white rounded-full h-6 w-6 flex items-center justify-center mr-3 flex-shrink-0 text-sm font-bold mt-0.5">{i+1}</span>
                          <span className="leading-relaxed">{rec}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-slate-600">All key recommendations have been met based on your inputs.</p>
                  )}
                </section>

                <section className="print:break-inside-avoid">
                  <h2 className="text-xl font-bold text-slate-800 mb-4 bg-slate-100 p-2 rounded-md">30/60/90-Day Roadmap</h2>
                  <div className="border-l-2 border-emerald-600 pl-6 py-2 space-y-6 relative">
                    <div>
                      <div className="absolute -left-2.5 mt-1.5 h-5 w-5 rounded-full border-4 border-white bg-emerald-600"></div>
                      <h3 className="font-bold text-slate-900 text-lg">30 Days: Assess & Gather</h3>
                      <p className="text-slate-600 mt-1">Compile all existing energy, fuel, and fleet records. Review current CRP status against PPN 06/21 requirements. Identify initial quick-win reduction actions.</p>
                    </div>
                    <div>
                      <div className="absolute -left-2.5 mt-1.5 h-5 w-5 rounded-full border-4 border-white bg-emerald-600"></div>
                      <h3 className="font-bold text-slate-900 text-lg">60 Days: Calculate & Structure</h3>
                      <p className="text-slate-600 mt-1">Calculate Scope 1 and 2 emissions if not done. Begin Scope 3 data collection mapping (Purchased Goods, Waste, Transport). Draft the formal Carbon Reduction Plan.</p>
                    </div>
                    <div>
                      <div className="absolute -left-2.5 mt-1.5 h-5 w-5 rounded-full border-4 border-white bg-emerald-600"></div>
                      <h3 className="font-bold text-slate-900 text-lg">90 Days: Publish & Prepare</h3>
                      <p className="text-slate-600 mt-1">Secure board approval for the CRP. Publish the CRP on your public website. Organise all documentation into a central &quot;evidence vault&quot; ready for tender submissions.</p>
                    </div>
                  </div>
                </section>

                <section className="text-xs text-slate-400 pt-8 border-t border-slate-100 print:pt-4">
                  <p className="font-bold mb-1 text-slate-500">Assumptions and Limitations</p>
                  <p>This report is generated based on self-reported data and is intended for internal preparation and gap analysis only. It does not replace formal verification, nor does it guarantee compliance with NHS England or any other public sector procurement requirements (such as PPN 06/21). Users should consult official NHS Evergreen Sustainable Supplier Assessment guidance and tender-specific requirements.</p>
                </section>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

const ScoreBar = ({ label, score, max }: { label: string, score: number, max: number }) => {
  const percentage = Math.round((score / max) * 100);
  let color = 'bg-emerald-500';
  if (percentage < 40) color = 'bg-red-500';
  else if (percentage < 70) color = 'bg-yellow-500';

  return (
    <div>
      <div className="flex justify-between text-sm mb-1">
        <span className="font-medium text-slate-700">{label}</span>
        <span className="text-slate-500">{score}/{max}</span>
      </div>
      <div className="w-full bg-slate-200 rounded-full h-2.5">
        <div className={`${color} h-2.5 rounded-full`} style={{ width: `${percentage}%` }}></div>
      </div>
    </div>
  );
};

const ScoreRow = ({ label, score, max }: { label: string, score: number, max: number }) => (
  <div className="flex justify-between items-center py-2 border-b border-slate-100 last:border-0">
    <span className="font-medium text-slate-700">{label}</span>
    <span className="font-bold text-slate-900 bg-slate-100 px-3 py-1 rounded-full">{score} / {max}</span>
  </div>
);

