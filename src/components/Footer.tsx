import React from 'react';
import { ExternalLink } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-slate-200 py-8 text-xs text-slate-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <span className="font-semibold text-slate-900">HeliosTandem</span> · Renewable Energy Research Platform
          <span className="mx-2 text-slate-300">|</span>
          <span>Data grounded in Fraunhofer ISE, NREL, Oxford PV & IEA publications</span>
        </div>

        <div className="flex items-center gap-4 text-xs font-medium text-slate-600">
          <a
            href="https://www.oxfordpv.com"
            target="_blank"
            rel="noreferrer noopener"
            className="hover:text-slate-950 transition-colors inline-flex items-center gap-1"
          >
            <span>Oxford PV</span>
            <ExternalLink className="w-3 h-3" />
          </a>
          <a
            href="https://www.ise.fraunhofer.de/en.html"
            target="_blank"
            rel="noreferrer noopener"
            className="hover:text-slate-950 transition-colors inline-flex items-center gap-1"
          >
            <span>Fraunhofer ISE</span>
            <ExternalLink className="w-3 h-3" />
          </a>
          <a
            href="https://www.iea.org"
            target="_blank"
            rel="noreferrer noopener"
            className="hover:text-slate-950 transition-colors inline-flex items-center gap-1"
          >
            <span>IEA Clean Energy</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </footer>
  );
};
