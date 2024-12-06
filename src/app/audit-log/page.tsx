'use client';

import { useState, useEffect, AwaitedReactNode, JSXElementConstructor, ReactElement, ReactNode, ReactPortal } from 'react';
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { logAction } from '@/utils/logger';
import MasterDataTable from '@/components/DataTables/DataTables';

interface Log {
  _id: string;
  action: string;
  userid: {
    first_name: string;
    last_name: string;
  };
  timestamp: string;
  details?: Record<string, any>;
}

interface Alllogs {
  _id: string;
  action: string;
  userid: {
    first_name: string;
    last_name: string;
  };
  timestamp: string;
  details?: Record<string, any>;
}

const columns = [
  {
    name: <span style={{ fontSize: 18 }}>Action</span>,
    selector: (row: { action: string }) => row.action,
    cell: (row: { action: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<AwaitedReactNode> | null | undefined; }) => <div style={{ fontSize: 17 }}>{row.action}</div>
  },
  {
    name: <span style={{ fontSize: 18 }}>Time Stamp</span>,
    selector: (row: { timestamp: string }) => row.timestamp,
    cell: (row: { timestamp: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<AwaitedReactNode> | null | undefined; }) => <div style={{fontSize: 17}}>{row.timestamp}</div>
  
  },
];

export default function AuditLogsPage() {
  const [logs, setLogs] = useState<Log[]>([]);
  const [alllogs, setFilterData] = useState<Alllogs[]>([]);
  
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const userid = typeof window !== "undefined" ? sessionStorage.getItem("userid") : null;

  const searchData = (searchQuery) => {
    let filterData = logs;
    if(searchQuery){
    filterData = logs.filter(auditData => 
        auditData.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
        auditData.timestamp.toLowerCase().includes(searchQuery.toLowerCase()) 
        )
        setLogs(filterData);
    }else{
        setLogs(alllogs);
    }
  }
   
  
  useEffect(() => {
    if (!userid) return; // Exit early if there's no user ID

    async function fetchLogs() {
      setLoading(true);
      try {
        const res = await fetch(`/api/logAction?userId=${userid}`);
        if (!res.ok) throw new Error("Failed to fetch logs");
        const data = await res.json();
        // console.log("aa",data.logs,"bb");
        setLogs(data.logs || []);
        setFilterData(data.logs || []);        
        // console.log(logs);
      } catch (error) {
        console.error('Failed to fetch logs:', error);
      } finally {
        setLoading(false);
      }
    }
    // Fetch logs only when the user ID is available
    fetchLogs();   
    // Call logAction only after fetching logs   

  }, [userid,logAction]); // Re-run when either userid or logFetched changes


  useEffect(() => {
    searchData(searchQuery);   
  }, [searchQuery]); // Re-run when either userid or logFetched changes

  return (
    <DefaultLayout>      
      <Breadcrumb pageName="Audit log" />
      {loading ? (
        <p>Loading...</p>
      ) : (<>
        <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
        <div className="flex flex-col gap-9">          
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <input className="border-b border-stroke px-6.5 py-4 dark:border-strokedark" style={{ width: "100%" }}  type='text' placeholder='Search' value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
          </div>
        </div>
        </div>
              
        <div className="mt-10 overflow-x-auto rounded-sm border ...">        
         <MasterDataTable columns={columns} data={logs} />
         </div>
      </>
        
      )}
    </DefaultLayout>
  );
}
