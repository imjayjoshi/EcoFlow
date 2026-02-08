import { ecos, products } from "@/data/mockData";
import { BarChart3, Download, TrendingUp, TrendingDown, Clock, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  AreaChart,
  Area,
  ResponsiveContainer,
} from "recharts";

// ECO Status Distribution Data
const ecoStatusData = [
  { name: "Draft", value: ecos.filter((e) => e.status === "draft").length, fill: "hsl(var(--status-draft))" },
  { name: "Submitted", value: ecos.filter((e) => e.status === "submitted").length, fill: "hsl(var(--status-submitted))" },
  { name: "Under Review", value: ecos.filter((e) => e.status === "under_review").length, fill: "hsl(var(--chart-4))" },
  { name: "Approved", value: ecos.filter((e) => e.status === "approved").length, fill: "hsl(var(--status-approved))" },
  { name: "Rejected", value: ecos.filter((e) => e.status === "rejected").length, fill: "hsl(var(--status-rejected))" },
];

// Monthly ECO Trend Data
const monthlyEcoTrend = [
  { month: "Sep", created: 8, approved: 6, rejected: 1 },
  { month: "Oct", created: 12, approved: 9, rejected: 2 },
  { month: "Nov", created: 10, approved: 8, rejected: 1 },
  { month: "Dec", created: 6, approved: 5, rejected: 0 },
  { month: "Jan", created: 14, approved: 10, rejected: 2 },
  { month: "Feb", created: 5, approved: 3, rejected: 1 },
];

// Approval Time Data
const approvalTimeData = [
  { range: "< 1 day", count: 12 },
  { range: "1-3 days", count: 18 },
  { range: "3-7 days", count: 8 },
  { range: "7-14 days", count: 4 },
  { range: "> 14 days", count: 2 },
];

// Product Version Activity
const productVersionActivity = [
  { month: "Sep", versions: 4 },
  { month: "Oct", versions: 6 },
  { month: "Nov", versions: 5 },
  { month: "Dec", versions: 3 },
  { month: "Jan", versions: 8 },
  { month: "Feb", versions: 2 },
];

// ECO by Type Data
const ecoTypeData = [
  { name: "Product", value: ecos.filter((e) => e.type === "product").length, fill: "hsl(var(--chart-1))" },
  { name: "BoM", value: ecos.filter((e) => e.type === "bom").length, fill: "hsl(var(--chart-2))" },
];

const chartConfig = {
  created: { label: "Created", color: "hsl(var(--chart-1))" },
  approved: { label: "Approved", color: "hsl(var(--status-approved))" },
  rejected: { label: "Rejected", color: "hsl(var(--status-rejected))" },
  versions: { label: "Versions", color: "hsl(var(--chart-3))" },
  count: { label: "Count", color: "hsl(var(--chart-2))" },
};

export default function Reports() {
  const totalEcos = ecos.length;
  const approvedRate = Math.round((ecos.filter((e) => e.status === "approved").length / totalEcos) * 100);
  const avgApprovalTime = 2.4;
  const activeProducts = products.filter((p) => p.status === "active").length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Reports & Analytics</h2>
          <p className="text-sm text-muted-foreground">
            Real-time insights into ECO performance and product lifecycle
          </p>
        </div>
        <Button variant="outline" size="sm">
          <Download className="mr-2 h-4 w-4" />
          Export All Reports
        </Button>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="enterprise-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total ECOs</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalEcos}</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
              <TrendingUp className="h-3 w-3 text-status-approved" />
              <span className="text-status-approved">+12%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card className="enterprise-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Approval Rate</CardTitle>
            <CheckCircle className="h-4 w-4 text-status-approved" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{approvedRate}%</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
              <TrendingUp className="h-3 w-3 text-status-approved" />
              <span className="text-status-approved">+5%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card className="enterprise-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Avg. Approval Time</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avgApprovalTime} days</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
              <TrendingDown className="h-3 w-3 text-status-approved" />
              <span className="text-status-approved">-0.8 days</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card className="enterprise-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active Products</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeProducts}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {products.length - activeProducts} archived
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 1 */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* ECO Trend Chart */}
        <Card className="enterprise-shadow">
          <CardHeader>
            <CardTitle className="text-base">ECO Trend (6 Months)</CardTitle>
            <CardDescription>Created vs Approved vs Rejected ECOs over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[280px] w-full">
              <AreaChart data={monthlyEcoTrend} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="fillCreated" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0.1} />
                  </linearGradient>
                  <linearGradient id="fillApproved" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--status-approved))" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="hsl(var(--status-approved))" stopOpacity={0.1} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis dataKey="month" className="text-xs" tick={{ fill: "hsl(var(--muted-foreground))" }} />
                <YAxis className="text-xs" tick={{ fill: "hsl(var(--muted-foreground))" }} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Area
                  type="monotone"
                  dataKey="created"
                  stroke="hsl(var(--chart-1))"
                  fill="url(#fillCreated)"
                  strokeWidth={2}
                />
                <Area
                  type="monotone"
                  dataKey="approved"
                  stroke="hsl(var(--status-approved))"
                  fill="url(#fillApproved)"
                  strokeWidth={2}
                />
                <ChartLegend content={<ChartLegendContent />} />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* ECO Status Distribution */}
        <Card className="enterprise-shadow">
          <CardHeader>
            <CardTitle className="text-base">ECO Status Distribution</CardTitle>
            <CardDescription>Current status breakdown of all ECOs</CardDescription>
          </CardHeader>
          <CardContent className="flex items-center justify-center">
            <ChartContainer config={chartConfig} className="h-[280px] w-full max-w-[320px]">
              <PieChart>
                <Pie
                  data={ecoStatusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={2}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}`}
                  labelLine={false}
                >
                  {ecoStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <ChartTooltip content={<ChartTooltipContent />} />
              </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 2 */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Approval Time Distribution */}
        <Card className="enterprise-shadow">
          <CardHeader>
            <CardTitle className="text-base">Approval Time Distribution</CardTitle>
            <CardDescription>How long ECOs take to get approved</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[220px] w-full">
              <BarChart data={approvalTimeData} layout="vertical" margin={{ top: 0, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" horizontal={false} />
                <XAxis type="number" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} />
                <YAxis
                  type="category"
                  dataKey="range"
                  tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }}
                  width={70}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="count" fill="hsl(var(--chart-2))" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Product Version Activity */}
        <Card className="enterprise-shadow">
          <CardHeader>
            <CardTitle className="text-base">Product Version Activity</CardTitle>
            <CardDescription>New product versions created per month</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[220px] w-full">
              <LineChart data={productVersionActivity} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis dataKey="month" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} />
                <YAxis tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line
                  type="monotone"
                  dataKey="versions"
                  stroke="hsl(var(--chart-3))"
                  strokeWidth={2}
                  dot={{ fill: "hsl(var(--chart-3))", strokeWidth: 2 }}
                />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* ECO by Type */}
        <Card className="enterprise-shadow">
          <CardHeader>
            <CardTitle className="text-base">ECO by Type</CardTitle>
            <CardDescription>Product vs BoM change orders</CardDescription>
          </CardHeader>
          <CardContent className="flex items-center justify-center">
            <ChartContainer config={chartConfig} className="h-[220px] w-full max-w-[200px]">
              <PieChart>
                <Pie
                  data={ecoTypeData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {ecoTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <ChartTooltip content={<ChartTooltipContent />} />
              </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Export Reports */}
      <Card className="enterprise-shadow">
        <CardHeader>
          <CardTitle className="text-base">Export Reports</CardTitle>
          <CardDescription>Download detailed reports in various formats</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { title: "ECO Summary Report", desc: `${ecos.length} total ECOs across all statuses` },
              { title: "Product Version History", desc: `${products.length} products tracked` },
              { title: "BoM Change History", desc: "Component-level change tracking" },
              { title: "Approval Aging Report", desc: "Average approval time: 2.4 days" },
            ].map((report) => (
              <div
                key={report.title}
                className="flex items-center justify-between rounded-lg border border-border bg-muted/30 p-3"
              >
                <div className="min-w-0">
                  <h4 className="text-sm font-medium text-foreground truncate">{report.title}</h4>
                  <p className="text-xs text-muted-foreground truncate">{report.desc}</p>
                </div>
                <Button variant="ghost" size="icon" className="shrink-0 ml-2">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
