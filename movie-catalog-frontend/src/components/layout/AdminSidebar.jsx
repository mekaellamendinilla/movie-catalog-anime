export default function AdminSidebar() {
    return (
        <aside>
            <h2>Admin Menu</h2>
            <ul>
                <li><a href="/admin/dashboard">Dashboard</a></li>
                <li><a href="/admin/movies">Manage Movies</a></li>
                <li><a href="/admin/users">Manage Users</a></li>
            </ul>
        </aside>
    )
}