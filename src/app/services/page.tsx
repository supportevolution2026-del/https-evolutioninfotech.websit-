'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import B2BQuoteModal from '@/components/B2BQuoteModal';
import {
  Server,
  Cpu,
  Cloud,
  ShieldCheck,
  Headphones,
  FileSpreadsheet,
  Zap,
  Building2,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';

export default function ServicesPage() {
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);

  const itServices = [
    {
      icon: <Server size={32} color="#06b6d4" />,
      title: 'Enterprise Server & Datacenter Setup',
      description: 'Turnkey deployment of Dell PowerEdge & HP Enterprise rackmount servers, SAN/NAS storage arrays, and high-availability virtualization clusters with VMware & Proxmox.',
      features: ['Dual Xeon/EPYC multi-socket servers', 'Hardware RAID & Hot-swap NVMe storage', 'iDRAC9 Enterprise remote console', '24x7 Mission-critical SLA support']
    },
    {
      icon: <Cpu size={32} color="#8b5cf6" />,
      title: 'Custom AI Compute & GPU Rigs',
      description: 'Specialized deep learning, LLM training, and 3D simulation workstations powered by multi-GPU NVIDIA RTX 4090 / RTX 6000 Ada and liquid cooling systems.',
      features: ['Multi-GPU PCIe 5.0 topology', 'Custom loop / closed loop high-efficiency liquid cooling', '128GB+ ECC high-speed RAM configs', 'Pre-configured CUDA, PyTorch, and TensorRT environments']
    },
    {
      icon: <Cloud size={32} color="#3b82f6" />,
      title: 'Microsoft 365 & Enterprise Cloud Migration',
      description: 'Authorized Microsoft Direct Partner. Seamless migration of company emails, Exchange, OneDrive, Teams, Intune MDM security, and cloud backup systems.',
      features: ['Authorized Microsoft commercial licenses', 'Zero-downtime email & data migration', 'Endpoint security & ransomware protection', 'Consolidated monthly / annual billing with GST invoice']
    },
    {
      icon: <Building2 size={32} color="#10b981" />,
      title: 'Corporate IT Infrastructure & Networking',
      description: 'End-to-end office networking with Cisco / Ubiquiti UniFi 10G SFP+ switches, structured Cat6A/Fiber optic cabling, enterprise firewalls, and WiFi 7 access points.',
      features: ['Layer-3 managed switches & VLAN configuration', 'Unified WiFi 7 coverage for 500+ concurrent clients', 'Next-Gen Firewall (Fortinet / SonicWall)', 'Biometric access & IP surveillance integration']
    },
    {
      icon: <Headphones size={32} color="#f59e0b" />,
      title: 'Annual IT Maintenance (AMC) & On-Site Support',
      description: 'Comprehensive AMC contracts for businesses, startups, and institutions. Dedicated certified IT engineers ensuring 99.9% uptime for all hardware and network endpoints.',
      features: ['Guaranteed 2-hour response time in Gujarat & Metro cities', 'Preventive periodic hardware maintenance & thermal repasting', 'Free standby replacement hardware during repairs', 'Dedicated account manager & ticketing portal']
    }
  ];

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar onOpenQuoteModal={() => setIsQuoteModalOpen(true)} />

      <main style={{ flex: 1, padding: '40px 0 60px 0' }}>
        <div className="container">
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '50px' }}>
            <div style={{ fontSize: '0.8rem', color: '#06b6d4', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase' }}>
              EVOLUTION INFOTECH SOLUTIONS
            </div>
            <h1 style={{ fontSize: '2.5rem', fontWeight: 900, color: '#ffffff', marginTop: '6px' }}>
              Enterprise IT Infrastructure & Digital Solutions
            </h1>
            <p style={{ color: '#94a3b8', fontSize: '1.05rem', maxWidth: '680px', margin: '10px auto 0 auto', lineHeight: 1.6 }}>
              From rack server deployments and AI computing clusters to licensed enterprise software, Evolution Infotech powers modern organizations across India.
            </p>
          </div>

          {/* Services Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: '28px',
            marginBottom: '60px'
          }}>
            {itServices.map((service, idx) => (
              <div
                key={idx}
                className="glass-card"
                style={{
                  padding: '32px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <div style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '14px',
                    background: 'rgba(255, 255, 255, 0.04)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '20px'
                  }}>
                    {service.icon}
                  </div>

                  <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#ffffff', marginBottom: '10px' }}>
                    {service.title}
                  </h3>

                  <p style={{ fontSize: '0.88rem', color: '#94a3b8', lineHeight: 1.6, marginBottom: '20px' }}>
                    {service.description}
                  </p>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', borderTop: '1px solid rgba(255, 255, 255, 0.06)', paddingTop: '16px' }}>
                    {service.features.map((feat, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '0.82rem', color: '#cbd5e1' }}>
                        <CheckCircle2 size={15} color="#10b981" style={{ flexShrink: 0, marginTop: '2px' }} />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{ marginTop: '24px', paddingTop: '16px' }}>
                  <button
                    onClick={() => setIsQuoteModalOpen(true)}
                    className="btn-primary"
                    style={{ width: '100%', padding: '12px', fontSize: '0.9rem' }}
                  >
                    Request Proposal / Quote <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* B2B Callout */}
          <div className="glass-panel" style={{
            padding: '40px',
            textAlign: 'center',
            background: 'radial-gradient(ellipse at center, rgba(6, 182, 212, 0.15), rgba(15, 23, 42, 0.95))',
            border: '1px solid rgba(6, 182, 212, 0.3)'
          }}>
            <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#ffffff' }}>
              Looking for Bulk Hardware Procurement with GST Input Tax Invoicing?
            </h2>
            <p style={{ color: '#94a3b8', fontSize: '0.95rem', maxWidth: '600px', margin: '12px auto 24px auto', lineHeight: 1.6 }}>
              Contact our corporate sales engineers today. We offer custom credit terms, official vendor registration, and direct delivery across India.
            </p>
            <button
              onClick={() => setIsQuoteModalOpen(true)}
              className="btn-primary"
              style={{ padding: '14px 32px', fontSize: '1rem' }}
            >
              Get Corporate Pricing
            </button>
          </div>
        </div>
      </main>

      <Footer />

      <B2BQuoteModal
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
      />
    </div>
  );
}
